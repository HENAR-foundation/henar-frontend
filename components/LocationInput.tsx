import { useTranslations } from 'next-intl';
import React, { FC, useState } from 'react';
import InputMaterial from './InputMaterial';
import { LocationSuggestsData } from 'api/types';
import { useQuery } from '@tanstack/react-query';
import { getLocationSuggest } from 'api/locationSuggets';
import { useRouter } from 'next/router';
import { getLocationById } from 'api/location';

const LocationInput: FC<{
  locationId?: string;
  onChange: ({
    data,
    value,
  }: {
    data: LocationSuggestsData;
    value: string;
  }) => void;
  error: string;
  label?: string;
  name: string;
}> = ({ locationId, label, onChange, error, name }) => {
  const [inputVal, setVal] = useState('');
  const [suggestsVisible, toggleVisibility] = useState(false);
  const { locale } = useRouter();
  const t = useTranslations();

  useQuery({
    queryFn: () => getLocationById(locationId || ''),
    enabled: false,
    queryKey: ['userLocation', locationId],
    onSuccess: (location) => {
      if (location) {
        setVal(location.value);
      }
    },
  });

  const { data: locSuggests } = useQuery({
    queryFn: () => {
      return getLocationSuggest(inputVal, locale === 'en' ? locale : 'ru');
    },
    queryKey: ['locSuggest', inputVal, locale],
  });

  const handleInputChange = (e: any) => {
    setVal(e.target.value);
  };

  const handleSuggestSelect = (index: number) => {
    const { data, value } = locSuggests?.suggestions[index] || {};
    setVal(value || '');
    if (data) onChange({ data, value: value || '' });
    toggleVisibility(false);
  };

  return (
    <div className='flex w-full relative flex-col'>
      <InputMaterial
        onFocus={() => toggleVisibility(true)}
        name={name}
        label={label}
        value={inputVal}
        error={t(error as any)}
        onChange={handleInputChange}
        placeholder={t('where_are_you_from')}
      />
      {suggestsVisible &&
        locSuggests &&
        locSuggests?.suggestions.length !== 0 && (
          <div className='flex flex-col absolute top-[45px] max-h-[180px] right-0 overflow-auto bg-white z-10 w-full border-t-[1px] border-accent2'>
            {locSuggests.suggestions.map(({ value }, index) => (
              <span
                onClick={() => handleSuggestSelect(index)}
                className='cursor-pointer font-thin text-m py-[10px] px-3'
              >
                {value}
              </span>
            ))}
          </div>
        )}
    </div>
  );
};

export default LocationInput;
