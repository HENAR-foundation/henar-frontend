import React, { FC, useEffect, useRef, useState } from 'react';
import ButtonOutline from './ButtonOutline';
import Image from 'next/image';
import { FormikErrors } from 'formik';

const ImageCross = () => (
  <svg
    width='32'
    height='32'
    viewBox='0 0 32 32'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <g filter='url(#filter0_d_409_11022)'>
      <rect x='4' width='24' height='24' rx='12' fill='white' />
      <path
        d='M16.7059 12.0001L19.8559 8.85509C19.9501 8.76094 20.003 8.63324 20.003 8.50009C20.003 8.36694 19.9501 8.23924 19.8559 8.14509C19.7618 8.05094 19.6341 7.99805 19.5009 7.99805C19.3678 7.99805 19.2401 8.05094 19.1459 8.14509L16.0009 11.2951L12.8559 8.14509C12.7618 8.05094 12.6341 7.99805 12.5009 7.99805C12.3678 7.99805 12.2401 8.05094 12.1459 8.14509C12.0518 8.23924 11.9989 8.36694 11.9989 8.50009C11.9989 8.63324 12.0518 8.76094 12.1459 8.85509L15.2959 12.0001L12.1459 15.1451C12.0991 15.1916 12.0619 15.2469 12.0365 15.3078C12.0111 15.3687 11.998 15.4341 11.998 15.5001C11.998 15.5661 12.0111 15.6315 12.0365 15.6924C12.0619 15.7533 12.0991 15.8086 12.1459 15.8551C12.1924 15.902 12.2477 15.9392 12.3087 15.9645C12.3696 15.9899 12.4349 16.003 12.5009 16.003C12.567 16.003 12.6323 15.9899 12.6932 15.9645C12.7542 15.9392 12.8095 15.902 12.8559 15.8551L16.0009 12.7051L19.1459 15.8551C19.1924 15.902 19.2477 15.9392 19.3087 15.9645C19.3696 15.9899 19.4349 16.003 19.5009 16.003C19.567 16.003 19.6323 15.9899 19.6932 15.9645C19.7542 15.9392 19.8095 15.902 19.8559 15.8551C19.9028 15.8086 19.94 15.7533 19.9654 15.6924C19.9908 15.6315 20.0038 15.5661 20.0038 15.5001C20.0038 15.4341 19.9908 15.3687 19.9654 15.3078C19.94 15.2469 19.9028 15.1916 19.8559 15.1451L16.7059 12.0001Z'
        fill='#112132'
      />
    </g>
    <defs>
      <filter
        id='filter0_d_409_11022'
        x='0'
        y='0'
        width='32'
        height='32'
        filterUnits='userSpaceOnUse'
        color-interpolation-filters='sRGB'
      >
        <feFlood flood-opacity='0' result='BackgroundImageFix' />
        <feColorMatrix
          in='SourceAlpha'
          type='matrix'
          values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
          result='hardAlpha'
        />
        <feOffset dy='4' />
        <feGaussianBlur stdDeviation='2' />
        <feComposite in2='hardAlpha' operator='out' />
        <feColorMatrix
          type='matrix'
          values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0'
        />
        <feBlend
          mode='normal'
          in2='BackgroundImageFix'
          result='effect1_dropShadow_409_11022'
        />
        <feBlend
          mode='normal'
          in='SourceGraphic'
          in2='effect1_dropShadow_409_11022'
          result='shape'
        />
      </filter>
    </defs>
  </svg>
);

const ProjectFilesUploader: FC<{
  onChange: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) =>
    | Promise<void>
    | Promise<
        FormikErrors<{
          title: string;
          description: string;
          tasks: string;
          request: string;
          photos: never[];
        }>
      >;
  name: string;
}> = ({ onChange, name,  }) => {
  const hiddenFileInput = useRef<any>(null);
  const [selectedFiles, setSelectedFile] = useState<any>();
  const [preview, setPreview] = useState<any[]>();

  useEffect(() => {
    if (!selectedFiles) {
      setPreview(undefined);
      return;
    }
    const objectUrls = [] as any;
    for (let index = 0; index < selectedFiles.length; index++) {
      const element = selectedFiles[index];
      objectUrls.push(URL.createObjectURL(element));
    }
    onChange(name, selectedFiles);
    setPreview(objectUrls as any);

    // free memory when ever this component is unmounted
    return () => objectUrls.forEach((url: any) => URL.revokeObjectURL(url));
  }, [selectedFiles]);

  const handleChange = (e: any) => {
    console.info(e);
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }
    // I've kept this example simple by using the first image instead of multiple
    setSelectedFile(e.target.files);
  };

  return (
    <>
      {selectedFiles && preview && (
        <div className='flex space-x-[20px]'>
          {preview.map((file: any, index) => (
            <figure
              key={index}
              className='mb-5 w-[82px] h-[82px] relative rounded-s overflow-hidden'
            >
              {/* <ImageCross /> */}
              <Image src={file} alt='' fill className='object-cover' />
            </figure>
          ))}
        </div>
      )}
      <ButtonOutline
        onClick={() => hiddenFileInput.current?.click()}
        className='w-[163px] lg:mt-0 mt-[30px]'
      >
        Загрузите фото
      </ButtonOutline>
      <input
        multiple
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

export default ProjectFilesUploader;
