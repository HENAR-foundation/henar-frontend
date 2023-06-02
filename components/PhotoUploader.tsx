import { FormikErrors } from 'formik';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import React, { FC, useEffect, useRef, useState } from 'react';
import NotAllowed from './NotAllowed';

const PhotoUploader: FC<{
  onChange: any;
  name: string;
}> = ({ name, onChange }) => {
  const t = useTranslations();
  const hiddenFileInput = useRef<any>(null);
  const [selectedFiles, setSelectedFile] = useState<any>();
  const [preview, setPreview] = useState<any>();

  useEffect(() => {
    if (!selectedFiles) {
      setPreview(undefined);
      return;
    }
    const objectUrls = [] as any;
    onChange(name, selectedFiles);
    setPreview(URL.createObjectURL(selectedFiles[0]) as any);

    // free memory when ever this component is unmounted
    return () => objectUrls.forEach((url: any) => URL.revokeObjectURL(url));
  }, [selectedFiles]);

  const handleChange = (e: any) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }
    // I've kept this example simple by using the first image instead of multiple
    setSelectedFile(e.target.files);
  };
  console.info(preview);
  return (
    <>
      <div
        className={`relative flex w-[150px] h-[150px] items-center justify-center bg-peach rounded-xl flex-col cursor-pointer ${
          preview ? 'text-white' : 'text-accent2'
        }`}
      >
        {selectedFiles && preview && (
          <figure className='w-[150px] h-[150px] relative rounded-s overflow-hidden bg-black'>
            {/* <ImageCross /> */}
            <Image src={preview} alt='' fill className='object-cover' />
          </figure>
        )}
        <NotAllowed>
          <div className='absolute top-0 left-0 w-full h-full flex justify-center items-center'>
            <span
              className='flex flex-col items-center'
            //   onClick={() => hiddenFileInput.current?.click()}
            >
              <Image
                src='/camera-peach.svg'
                width={20}
                height={20}
                alt={t('upload_photo')}
              />
              <span className='cursor-default text-a-ss'>
                {t('upload_photo')}
              </span>
            </span>
          </div>
        </NotAllowed>
      </div>
      <input
        accept='image/*'
        ref={hiddenFileInput}
        name={name}
        className='hidden'
        type='file'
        // value={value}
        onChange={handleChange}
      />
    </>
  );
};

export default PhotoUploader;
