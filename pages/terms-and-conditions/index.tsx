import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import { GetServerSideProps } from 'next';
import { useTranslations } from 'next-intl';

import { useRouter } from 'next/router';


const TermsPage = () => {
  const { push } = useRouter();
  const t = useTranslations();

  return (
    <>
      <Head>
        <title> {t('registration')}</title>
      </Head>
      <div className='mb-16 h-full flex items-center justify-center'>
        <div className='shadow-sm flex bg-white rounded-s overflow-hidden mt-[100px] pt-12 px-8 pb-8 flex-col'>
          <h1 className='text-h-m-d text-center font-bold mb-4'>TERMS AND CONDITIONS</h1>
          <div>

          <p className="my-2"> Welcome to https://healthnet.am/ (“Website”), a website provided on behalf of “HENAR”
            Charitable Foundation (“we” and “us”).</p>
            
            <p className="my-2">These Terms and Conditions govern your access to and use of our Website, and your donations
            or use of any resources or content offered by us, whether through the Website or otherwise (the
            “Services”). You should carefully read these Terms & Conditions before using the Website.
            By using the Website, you accept these Terms & Conditions and the Privacy Policy that
            constitutes an integral part of these Terms & Conditions.</p>
           
            <p className="my-2"> We reserve the right of updating or amending these Terms & Conditions from time to time without
            notice to you. Any updates will be posted, and the date of recent revisions will appear on the
            Website, so please check this page occasionally to see if you are happy with the current edition
            of the Terms & Conditions. Your continued use of the Website after new edition of these Terms
            & Conditions is posted on the Website constitutes your acceptance of the Terms & Conditions as
            modified.</p>
            
            <p className="my-2">You agree to use the Website only for lawful purposes, and in a manner, which does not infringe
            the rights of, or restrict or inhibit the use and enjoyment of the Website by any third party.
            We do not warrant that this Website or the functions contained in the material contained in this
            Website will be uninterrupted or error free, that defects will be corrected, or that this Website or
            the server that makes it available are free of viruses or bugs or represents the full functionality,
            accuracy and reliability of the materials.</p>
            <h2 className="my-2 font-bold">Access to Services:</h2>
            <p>The user can register in the following ways:</p>
            <p>• Providing an Email address</p>
            <p>• Providing a phone number</p>
            <p>• Using a Facebook account</p>
            <p>• Using a Google account</p>
            <p>• Through other options available on the moment of registration</p>
            <p className="my-2"></p>To confirm the registration request, We send an email / SMS code to Your phone number or email
            address, after submitting which the registration request is confirmed.
            You have the right to leave Your opinion or questions in the comments section of the Website.
            We reserve the right to remove any comment which may be offensive, discriminatory, qualify as
            a hate speech or in any other way violate the rights of other persons.
            We are not responsible for the truthfulness and reliability of the data posted on the Website.
            <h2 className="my-2 font-bold">Copyright restrictions:</h2>
            <p className="my-2">Commercial use or publication of all or any items displayed on the Website is strictly
            prohibited without our prior authorization. Nothing contained herein shall be construed as
            conferring any license by us to use any item displayed.
            Items displayed on the Website may be copied for personal use only on the condition that
            copyright and source indications are also copied, no modifications are made. However,
            some texts and photos may have been published on this Website with the permission of
            the relevant copyright owners (who are not us). All rights in these texts and photos are
            reserved to their owners, and permission to copy or otherwise exploit them must be
            requested and obtained directly from the copyright owners.</p>
            <h2 className="my-2 font-bold">Third-party websites:</h2>
            <p>The Website may contain links to other websites. All such links are provided as a convenience to
            you and your use of such websites will be governed by their applicable terms and conditions and
            privacy policies. We take no responsibility for the content of external websites.
            If you have any questions about these Terms & Conditions or your interaction with the Website,
            please contact us at info@henar.am</p>
          </div>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      messages: {
        ...(await import(`../../messages/${locale}.json`)).default,
        ...(await import(`../../messages/formErrors/${locale}.json`)).default,
      },
    },
  };
};

export default TermsPage;

