import { log } from 'console';
import Image from 'next/image';
import { type } from 'os';
import React, { FC, useEffect, useState } from 'react';
import { useToggle } from 'usehooks-ts';

const Icons = {
    globe: 'globe.svg',
    cap: 'graduation-cap-green.svg',
    microscope: 'microscope.svg',
} as const;

const SelectMaterial: FC<{
    name?: string;
    icon?: keyof typeof Icons;
    label?: string;
    onChange?: (name: string, value: string) => void;
    className?: string;
    options: any[];
    defaultVal: string;
    value?: string;
    withEditButton?: boolean;
    onEditButton?: (id: string) => void;
}> = ({ defaultVal, onChange, options, name, icon, className, label, withEditButton, onEditButton, value }) => {
    const [isOpened, toggleOpen] = useToggle(false);
    const [selectedOption, toggleOption] = useState(-1);

    useEffect(() => {
        toggleOption(options.findIndex(item => item.val === value) + 1)
    }, [value])

    const handleOptionClick = (e: any) => {
        if (e.currentTarget.dataset['index']) {
            toggleOption(e.currentTarget.dataset['index']);
            toggleOpen();
            onChange &&
                onChange(name || '', optionsList[e.currentTarget.dataset['index']].val.toString());
        }
    };


    const handleKeyDown = (index: number) => (e: any) => {
        switch (e.key) {
            case ' ':
            case 'SpaceBar':
            case 'Enter':
                e.preventDefault();
                toggleOption(+index);
                toggleOpen();
                break;
            default:
                break;
        }
    };

    const optionsList = [{ label: defaultVal, val: '' }, ...options];
    return (
        <div className={'w-full font-bodyLight flex items-end ' + className}>
            {icon && (
                <div className='flex h-[45px] justify-center align-center mr-3'>
                    <Image
                        src={`/${Icons[icon]}`}
                        width={17}
                        height={17}
                        alt={`${icon} icon`}
                    />
                </div>
            )}
            <div className='flex flex-col w-full'>
                {label && (
                    <label
                        className='inline-block text-secondary text-a-s w-fit'
                        htmlFor='city'
                    >
                        {label}
                    </label>
                )}
                <div className='relative'>
                    <button
                        id='city'
                        defaultValue={''}
                        onClick={toggleOpen}
                        aria-haspopup='listbox'
                        aria-expanded={isOpened}
                        className='text-left border-b-[1px] border-borderPrimary cursor-pointer  text-primary bg-no-repeat bg-[calc(100%-5px)_50%] relative bg-transparent focus:ring-blue-500 focus:border-blue-500 block w-full  py-[11px] text-a-m appearance-none bg-arrow-select-green'
                    >
                        {optionsList[selectedOption]?.label || defaultVal}
                    </button>
                    {isOpened && (
                        <ul
                            role='listbox'
                            aria-activedescendant={optionsList[selectedOption]?.label || ''}
                            tabIndex={-1}
                            className='z-30 shadow-l bg-white rounded-bl-l rounded-br-l w-full px-4 py-2 absolute space-y-5 max-h-[300px] overflow-auto'
                        >
                            {optionsList.map((option, index) => option.label
                                ? (
                                    <li
                                        className='cursor-pointer text-m flex justify-between'
                                        onKeyDown={handleKeyDown(index)}
                                        role='option'
                                        aria-selected={selectedOption == index}
                                        tabIndex={0}
                                        data-index={index}
                                        onClick={handleOptionClick}
                                    >
                                        {option.label}
                                        {selectedOption == index && (
                                            <Image
                                                src='/check.svg'
                                                width={20}
                                                height={20}
                                                alt='slected option icon'
                                            />
                                        )}
                                        {(withEditButton && onEditButton && selectedOption != index && index != 0) && <Image
                                            src='/edit.svg'
                                            width={20}
                                            height={20}
                                            alt='slected option icon'
                                            onClick={() => onEditButton(option.val)}
                                        />}
                                    </li>
                                ) : <li>{React.createElement(option)}</li>
                            )}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SelectMaterial;
