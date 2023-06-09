import Head from 'next/head';
import withAuth from 'hocs/withAuth';
import ButtonPrimary from 'components/ButtonPrimary';
import Image from 'next/image';
import { FC } from 'react';
import { GetServerSideProps } from 'next';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';

const Specialist: FC<{
  name: string;
  spec: string;
  className: string;
  desc: string;
  pic: string;
}> = ({ name, className, spec, desc, pic }) => (
  <div
    className={`justify-between shadow-l w-fit rounded-s bg-white flex px-[20px] lg:px-[32px] py-[16px] lg:py-[25px] lg:min-h-[294px] min-h-[205px] flex-col max-w-[185px] lg:max-w-[294px] ${className}`}
  >
    <Image
      src={pic}
      width={110}
      height={110}
      alt='specialist avatar'
      className='hidden lg:inline-block'
    />
    <div className='flex flex-col'>
      <Image
        src={pic}
        width={70}
        height={70}
        alt='specialist avatar'
        className='lg:hidden inline-block'
      />
      <span className='mt-3 lg:mt-4 lg:text-xl text-a-ss leading-[140%]'>
        {name}
      </span>
      <span className='text-accent1 mb-[9px]  lg:text-m text-a-sss'>
        {spec}
      </span>
    </div>
    <span className='text-a-sss lg:text-a-ss leading-[140%] font-bodyLight'>
      {desc}
    </span>
  </div>
);

const RegForm = () => {
  //   const formik = useFormik({
  //     initialValues: {
  //       name: '',
  //       location: '',
  //       job: '',
  //     },
  //     validateOnChange: false,
  //     validationSchema: SignupSchema,
  //     onSubmit: (values) => {
  //       alert(JSON.stringify(values, null, 2));
  //     },
  //   });

  const { push } = useRouter();
  const t = useTranslations();
  return (
    <div className='lg:flex w-full mt-[57px] lg:mt-14 relative lg:h-[724px] justify-center items-center'>
      <div className='flex bg-mint rounded-xll justify-between lg:flex-row flex-col'>
        <div className='lg:max-w-[440px] flex ml-[26px] lg:ml-11 flex-col'>
          <h3 className='font-bold text-h-m-d lg:text-h-l-d leading-[100%] mt-[27px] lg:mt-[62px]'>
            {t('joincommunity')}
          </h3>
          <span className='font-bodyLight text-m leading-[140%] mt-4'>
            {t('signupbenefits')}
          </span>
        </div>
        <div className='flex lg:ml-[90px] lg:flex-auto flex-1'>
          <div className='lg:max-w-[386px] flex lg:flex-auto flex-1 mt-10 lg:mr-[89px] lg:mb-[72px] bg-white rounded-xll px-6 pb-6 pt-12 flex-col'>
            <h3 className='text-h-m-m font-bold'>{t('tell_us')}</h3>
            <span className='mt-3'>{t('beginregistration')}</span>
            {/* <form className='flex flex-col' onSubmit={formik.handleSubmit}> */}
            {/* <span className='mt-11 text-l'>Как вас зовут?</span>
              <InputMaterial
                name='name'
                error={formik.errors.name}
                onChange={formik.handleChange}
                value={formik.values.name}
                placeholder='Имя'
              />
              <span className='mt-7 text-l'>Откуда вы?</span>
              <InputMaterial
                name='location'
                error={formik.errors.location}
                onChange={formik.handleChange}
                value={formik.values.location}
                placeholder='Выберите город'
              />
              <span className='mt-7 text-l'>Кем вы работаете?</span>
              <InputMaterial
                name='job'
                error={formik.errors.job}
                onChange={formik.handleChange}
                value={formik.values.job}
                placeholder='Выберите должность'
              /> */}
            <ButtonPrimary
              onClick={() => push('/registration')}
              className='mt-11 w-full'
              kind='M'
              icon='arrow'
            >
              {t('register')}
            </ButtonPrimary>
            {/* </form> */}
          </div>
        </div>
      </div>
    </div>
  );
};

const Home = () => {
  const t = useTranslations();

  return (
    <>
      <Head>
        <title>HNA</title>
      </Head>
      <div className='bg-white pt-10 pb-[140px]'>
        <div className='flex w-full lg:space-x-6'>
          <div className='lg:flex hidden flex-[0.38] min-h-[420px] bg-accent1 rounded-r-xl bg-opacity-10'></div>
          <div className='flex flex-1 lg:flex-[0.62] break-words lg:min-h-[420px] bg-accent1 lg:rounded-r-[0] rounded-r-xll rounded-l-xll bg-opacity-10 pl-5 pr-5 lg:pr-0 lg:pl-8 flex-col justify-between'>
            <div>
              <h3 className='font-body mt-8 lg:mt-10 text-h-xl-m lg:text-h-xl-d font-bold lg:w-[470px] leading-[100%] mb-3 lg:mb-[19px]'>
                {t('welcome_header')}
              </h3>
              <span className='text-m'>{t('welcome_footer')}</span>
            </div>
            <ButtonPrimary kind='M' className='mb-6 mt-[70px] lg:w-[205px]'>
              {t('registration')}
            </ButtonPrimary>
          </div>
        </div>
        <div className='flex w-full space-x-6 mt-6 lg:mt-14'>
          <div className='flex flex-1 lg:flex-[0.51] lg:h-[430px] bg-cream lg:rounded-l-[0] rounded-l-xll rounded-r-xll lg:pr-[103px] justify-center flex-col lg:items-end items-center'>
            <div className='flex flex-col text-left lg:w-[242px] px-[26px] lg:px-0'>
              <Image
                className='inline-block lg:hidden mb-[25px]'
                src='/feedbacks-m.png'
                width={369}
                height={276}
                alt=''
              />
              <span className='text-accent2'>{t('projects')}</span>
              <h3 className='font-body my-[14px] text-h-l-d font-bold leading-[100%] w-full'>
                {t('createprojects')}
              </h3>
              <span className='text-m mb-10'>
                Единая платформа для диаспоральных врачей армении
              </span>
              <ButtonPrimary className='lg:mb-0 mb-6' color='cream' kind='M'>
                {t('toprojects')}
              </ButtonPrimary>
            </div>
          </div>
          <div className='hidden lg:flex flex-[0.49] h-[430px] bg-cream rounded-l-xll  pl-[57px] flex-col justify-center'>
            <Image
              src='/feedbacks.png'
              height={310}
              width={373}
              alt='feedbacks'
            />
          </div>
        </div>
        <div className='flex w-full lg:space-x-6 mt-6 lg:mt-14 lg:min-h-[704px] relative'>
          <div className='hidden lg:flex w-full bg-mint rounded-r-xl'></div>
          <div className='flex flex-1 lg:min-w-[856px] bg-mint rounded-xll align-center flex-col items-center lg:px-0 px-5'>
            <span className='hidden lg:inline-block text-center text-accent1 opacity-50 mt-[74px]'>
              {t('experts')}
            </span>
            <h3 className='mt-[32px] mb-5 lg:max-w-[490px] break-words lg:mt-0 font-body text-h-m-d lg:text-h-l-d font-bold leading-[100%] text-center'>
              {t('connectexperts')}
            </h3>
            <div className='relative h-[195px] lg:h-[360px] w-full lg:mt-0 mt-8'>
              <Specialist
                className='left-[-175px] lg:left-[-45px] absolute'
                desc='"Preventive Care Campaign": Raising awareness about preventive care and healthy lifestyle choices.'
                spec='General Practitioner (GP)'
                name='David Ghazaryan'
                pic='/fish-expert-david.png'
              />
              <Specialist
                className='lg:top-[60px] lg:left-[calc(50%-152px)] left-[calc(50%-93px)] absolute'
                desc='Geriatric Care and Elderly Support Program'
                spec='Geriatrician'
                name='Lilit Aghajanyan'
                pic='/fish-expert-lilit.png'
              />
              <Specialist
                className='lg:top-[20px] lg:right-[-45px] right-[-175px] absolute'
                desc='Chronic Disease Management Program. Make them essential for leading programs focused on effectively managing conditions '
                spec='Internal Medicine Physician'
                name='Armen Harutyunyan'
                pic='/fish-expert-armen.png'
              />
            </div>
            <ButtonPrimary
              kind='M'
              className='mt-10 mb-6 lg:mb-12 lg:w-[206px] w-full'
            >
              {t('toexperts')}
            </ButtonPrimary>
          </div>
          <div className='hidden lg:flex w-full bg-mint rounded-l-xl'></div>
        </div>
        <div className='flex w-full mt-14 relative lg:h-[489px] flex-col lg:flex-row'>
          <div className='hidden lg:flex flex-1 bg-accent2 bg-opacity-20 rounded-xll items-center justify-end'>
            <div className='mr-[33px]'>
              <Image src='/stat-left.png' height={279} width={472} alt='' />
            </div>
          </div>
          <div className='flex flex-col bg-peach items-center justify-center'>
            <span className='lg:hidden inline-block text-accent2 mt-[22px]'>
              {t('researches')}
            </span>
            <Image
              src='/stats-m.png'
              width={325}
              height={156}
              alt=''
              className='lg:hidden mb-[18px]'
            />
          </div>
          <div className='w-full flex lg:w-[377px] items-center flex-col'>
            <span className='hidden lg:inline-block text-accent2 mt-[60px]'>
              {t('researches')}
            </span>
            <h3 className='text-h-m-d lg:text-h-l-d text-center leading-[100%] mt-[20px]'>
              {t('exploredata')}
            </h3>
            <span className='font-bodyLight text-m mt-[15px] lg:mt-[20px] text-center'>
              {t('stayinformed')}
            </span>
            <ButtonPrimary
              kind='M'
              color='cream'
              className='w-[206px] mt-[38px] lg:mt-8'
            >
              {t('toanalytics')}
            </ButtonPrimary>
          </div>
          <div className='hidden lg:flex flex-1 bg-accent2 bg-opacity-20 rounded-xll items-center justify-start'>
            <div className='ml-[33px]'>
              <Image src='/stat-right.png' height={251} width={451} alt='' />
            </div>
          </div>
        </div>
        <RegForm />
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      messages: {
        ...(await import(`../messages/${locale}.json`)),
        ...(await import(`../messages/landing/${locale}.json`)),
      },
    },
  };
};

export default Home;
