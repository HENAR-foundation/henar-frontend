import ButtonPrimary from 'components/ButtonPrimary';
import InputMaterial from 'components/InputMaterial';

const AboutModal = () => {
  return (
    <div className='shadow-sm flex bg-white rounded-s overflow-hidden mt-[100px] w-full max-w-[584px] pt-12 px-8 pb-8 flex-col'>
      <h1 className='text-h-m-d font-bold mb-4'>Расскажите о себе</h1>
      <span className='mb-11 font-bodyLight text-m'>
        После этого мы сможем показывать ваш профиль другим участникам
      </span>
      <div className='flex justify-between lg:flex-row flex-col'>
        <span>Как вас зовут?</span>
        <div className='flex flex-col space-y-3 lg:w-[295px]'>
          <InputMaterial placeholder='Имя' />
          <InputMaterial placeholder='Фамилия' />
        </div>
      </div>
      <div className='mt-7 lg:mt-10 flex justify-between flex-col lg:space-y-0 space-y-3'>
        <div className='flex w-full lg:justify-between lg:items-center lg:flex-row flex-col'>
          <span>Откуда вы?</span>
          <InputMaterial className='lg:w-[295px]' placeholder='Введите город' />
        </div>
        <div className='flex space-y-3 w-full lg:justify-between lg:items-center lg:flex-row flex-col'>
          <span>Кем вы работаете?</span>
          <InputMaterial
            className='lg:w-[295px]'
            placeholder='Введите должность'
          />
        </div>
      </div>
      <div className='flex justify-between mt-11 items-center'>
        <span className='font-bodyLight hidden lg:inline-block text-tetriary max-w-[205px] text-a-ss leading-4'>
          Нажимая на кнопку “Сохранить”, вы соглашаетесь с политикой
          конфеденциальности
        </span>
        <ButtonPrimary className='lg:w-[140px] w-full text-left' kind='M'>Сохранить</ButtonPrimary>
      </div>
    </div>
  );
};

export default AboutModal;
