import Head from 'next/head';
import withAuth from 'hocs/withAuth';
import ButtonPrimary from 'components/ButtonPrimary';
import Image from 'next/image';
import { FC } from 'react';
import { GetServerSideProps } from 'next';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';
import Link from 'next/link';

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
    <span className='text-a-sss lg:text-a-ss leading-[140%] font-bodyLight text-secondary'>
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
  const { locale } = useRouter();
  return (
    <>
      <Head>
        <title>HNA</title>
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <div className='bg-white pt-10 pb-[140px]'>
        <div className='flex w-full bg-accent1 bg-opacity-10 justify-center'>
          <div className='lg:ml-[160px] flex break-words lg:min-h-[420px] pl-5 pr-5 justify-between'>
            <div>
              <div className='lg:mr-[124px]'>
                <h3 className='lg:w-[458px] font-body mt-8 lg:mt-12 text-h-m-d lg:text-h-l-d font-bold leading-[100%] mb-3 lg:mb-[19px]'>
                  {t('welcome_header')}
                </h3>
                <span className='text-m inline-block lg:w-[328px]'>
                  {t('welcome_footer')}
                </span>
              </div>
              <Link href='registration'>
                <ButtonPrimary
                  kind='M'
                  className='lg:mb-[63px] w-full mb-6 mt-[70px] lg:w-[205px]'
                >
                  {t('registration')}
                </ButtonPrimary>
              </Link>
            </div>
            <div className='lg:flex items-end hidden'>
              <Image
                src={`/phone-card${locale === 'ru' ? '' : '-en'}.png`}
                width={218}
                height={342}
                alt=''
              />
            </div>
          </div>
        </div>
        <div className='flex w-full space-x-6 mt-6 lg:mt-14'>
          <div className='flex flex-1 lg:flex-[0.51] lg:h-[430px] bg-cream lg:rounded-l-[0] rounded-l-xll rounded-r-xll lg:pr-[103px] justify-center flex-col lg:items-end items-center'>
            <div className='pl-6  flex w-full justify-end'>
              <Image
                className='inline-block lg:hidden mb-[25px]'
                src={`/feedbacks-m${locale === 'ru' ? '' : '-en'}.png`}
                width={369}
                height={276}
                alt=''
              />
            </div>
            <div className='flex flex-col text-left lg:w-[242px] px-[26px] lg:px-0'>
              <span className='text-accent2'>{t('projects')}</span>
              <h3 className='font-body my-[14px] text-h-m-d lg:text-h-l-d font-bold leading-[100%] w-full'>
                {t('createprojects')}
              </h3>
              <span className='text-m mb-10'>{t('collaborate')}</span>
              <Link href="projects">
                <ButtonPrimary className='lg:mb-0 mb-6' color='cream' kind='M'>
                    {t('toprojects')}
                </ButtonPrimary>
              </Link>
            </div>
          </div>
          <div className='hidden lg:flex flex-[0.49] h-[430px] bg-cream rounded-l-xll  pl-[57px] flex-col justify-center'>
            <Image
              src={`/feedbacks${locale === 'ru' ? '' : '-en'}.png`}
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
                desc={t('p-l-desc')}
                spec={t('p-l-job')}
                name={t('p-l-name')}
                pic='/fish-expert-david.png'
              />
              <Specialist
                className='lg:top-[60px] lg:left-[calc(50%-152px)] left-[calc(50%-93px)] absolute'
                desc={t('p-c-desc')}
                spec={t('p-c-job')}
                name={t('p-c-name')}
                pic='/fish-expert-lilit.png'
              />
              <Specialist
                className='lg:top-[20px] lg:right-[-45px] right-[-175px] absolute'
                desc={t('p-r-desc')}
                spec={t('p-r-job')}
                name={t('p-r-name')}
                pic='/fish-expert-armen.png'
              />
            </div>
            <Link href="specialists">
                <ButtonPrimary
                kind='M'
                className='mt-10 mb-6 lg:mb-12 lg:w-[206px] w-full'
                >
                {t('toexperts')}
                </ButtonPrimary>
            </Link>
          </div>
          <div className='hidden lg:flex w-full bg-mint rounded-l-xl'></div>
        </div>
        <div className='flex w-full mt-14 relative lg:h-[489px] flex-col lg:flex-row'>
          <div className='hidden lg:flex flex-1 bg-accent2 bg-opacity-20 rounded-r-xll items-center justify-end'>
            <div className='mr-[33px]'>
              <Image
                src={`/stat-left${locale === 'ru' ? '' : '-en'}.png`}
                height={279}
                width={472}
                alt=''
              />
            </div>
          </div>
          <div className='flex flex-col bg-peach items-center justify-center'>
            <span className='lg:hidden inline-block text-accent2 mt-[22px]'>
              {t('researches')}
            </span>
            <Image
              src={`/stats-m${locale === 'ru' ? '' : '-en'}.png`}
              width={900}
              height={156}
              alt=''
              className='lg:hidden mb-[18px] mt-3'
            />
          </div>
          <div className='w-full px-7 flex lg:w-[377px] items-center flex-col'>
            <span className='hidden lg:inline-block text-accent2 mt-[60px]'>
              {t('researches')}
            </span>
            <h3 className='text-h-m-d lg:text-h-l-d text-center leading-[100%] mt-[20px]'>
              {t('exploredata')}
            </h3>
            <span className='font-bodyLight text-m mt-[15px] lg:mt-[20px] text-center'>
              {t('stayinformed')}
            </span>
            <Link href="researches">
                <ButtonPrimary
                kind='M'
                color='cream'
                className='lg:w-[206px] w-full mt-[38px] lg:mt-8'
                >
                {t('toanalytics')}
                </ButtonPrimary>
            </Link>
          </div>
          <div className='hidden lg:flex flex-1 bg-accent2 bg-opacity-20 rounded-l-xll items-center justify-start'>
            <div className='ml-[33px]'>
              <Image
                src={`/stat-right${locale === 'ru' ? '' : '-en'}.png`}
                height={251}
                width={451}
                alt=''
              />
            </div>
          </div>
        </div>
        <div className='flex w-full mt-14 relative lg:h-[430px] flex-col lg:flex-row lg:space-x-[25px]'>
          <div className='hidden lg:flex flex-[0.825] bg-mint rounded-r-xll items-center justify-end'>
            <div className='flex flex-col mr-12'>
              <span className='text-accent1'> {t('events')}</span>
              <h3 className='w-[330px] leading-[100%] my-4 text-h-l-d break-words'>
                {t('stay-tuned')}
              </h3>
              <span className='lg:w-[240px] text-m leading-[150%] font-bodyLight'>
                {t('medical-events')}
              </span>
              <Link href='/events'>
                <ButtonPrimary kind='M' className='mt-10 lg:w-[225px]'>
                  {t('to-events')}
                </ButtonPrimary>
              </Link>
            </div>
          </div>
          <div className='lg:hidden flex flex-col items-center justify-center text-center'>
            <h3 className='max-w-[286px] mb-[17px] text-h-m-d leading-[100%]'>
              {t('stay-tuned')}
            </h3>
            <span className='mb-[30px] max-w-[250px]'>
              {t('medical-events')}
            </span>
          </div>
          <div className='flex flex-1 bg-mint lg:rounded-l-xll items-center lg:justify-start justify-center'>
            <Image
              className='hidden lg:flex ml-[30px]'
              src={`/skeletor${locale === 'ru' ? '' : '-en'}.png`}
              width={650}
              height={307}
              alt='skeletor'
            />
            <div className='flex lg:hidden  w-[80%] flex-col justify-center items-center'>
              <span className='text-accent1 mb-[18px] mt-[22px] text-xl'>
                {t('events')}
              </span>
              <Image
                className='mb-[35px]'
                src={`/skeletor-m${locale === 'ru' ? '' : '-en'}.png`}
                width={650}
                height={307}
                alt='skeletor'
              />
            </div>
          </div>
          <Link href='/events' className='mx-7 lg:hidden flex mt-[30px]'>
            <ButtonPrimary kind='M' className='w-full'>
              {t('to-events')}
            </ButtonPrimary>
          </Link>
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
