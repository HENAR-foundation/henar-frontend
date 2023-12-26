import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import { GetServerSideProps } from 'next';
import { useTranslations } from 'next-intl';

import { useRouter } from 'next/router';


const PrivacyPage = () => {
  const { push } = useRouter();
  const t = useTranslations();

  return (
    <>
      <Head>
        <title> {t('registration')}</title>
      </Head>
      <div className='mb-16 h-full flex items-center justify-center'>
        <div className='shadow-sm flex bg-white rounded-s overflow-hidden mt-[100px] pt-12 px-8 pb-8 flex-col'>
          <h1 className='text-h-m-d text-center font-bold mb-4'>PRIVACY POLICY</h1>
          <div>

            <p className="my-2">“HENAR” Charitable Foundation (“we”, “us” or “our”) is committed to complying with its legal
              obligations under the applicable laws and to the protection of the rights and freedoms of
              individuals whose personal data we obtain or generate as part of our activities.
            </p>
            <p>We use information held about you in the following ways:</p>
            <ul>
              <li>• To provide you with information and support that you request from https://healthnet.am/
                or expect within the scope of cooperation between us and you.</li>
              <li>• To provide you with newsletters, information about our upcoming events and projects
                that we feel may interest you.</li>
              <li>• To allow you to participate in our events, discussions and supporting activities when you
                choose to do so.</li>
              <li>• To use your personal data, including photos or videos with your participation in various
                media channels, including social media.</li>
              <li>• To prepare and generate statistics and other reports.</li>
              <li>• To examine your requests and ensure immediate connection with you.</li>
              <li>• To disclose or share your personal data if we are under a duty to do so in order to comply
                with any legal obligation.</li>
            </ul>
            <p>We shall not process your personal data for the purposes other than listed above or prescribed
              by the applicable law.</p>

            <p className="my-2">For the purposes of identification of your preferences, personalization and improving the Website
              usability “cookie” files are used. If you do not wish to use “cookie” files, you shall change the Web
              browser settings. You shall be aware that disabling cookie may lead to inability to access the
              Website.</p>

            <p className="my-2">The date of giving consent to the processing of your personal data is the date of submitting your
              personal data through the website.</p>

            <p className="my-2">We implement or ensure implementation of appropriate technical and organizational measures to
              protect the information we collect and store from unlawful or accidental access to it, destruction,
              modification, blocking, copying, distribution of personal data, as well as from other illegal actions
              in relation to personal data.</p>

            <p className="my-2">Whilst we use our best efforts to ensure the security of your personal data, please be aware that
              the security of information transmitted over the Internet cannot be guaranteed. Accordingly, any
              transfer of personal data over the Internet, including during submission of such information to the
              Website, is done at your own risk.</p>

            <h2 className="my-2 font-bold">Rights of a Data Subject</h2>
            <p>As a data subject you have certain rights which you may exercise if we are in possession of, or is
              processing, your personal data. Specifically:</p>
              <p>• Right of access – you have the right to request a copy of the information that we hold
            about you.</p>
            <p>• Right of rectification – you have a right to correct data that we hold about you that is
            inaccurate or incomplete.</p>
            <p>• Right to be forgotten – you have a right, in certain circumstances, to ask for the data we
            hold about you to be erased from our records.• Right to restriction of processing – where certain conditions apply you have a right to
            restrict the processing of your personal data.</p>
            <p>• Right of portability – you have the right to have the data we hold about you transferred
            to another organization.</p>
            <p>• Right to object – you have the right to object to certain types of processing or to ask to
            stop or to restrict the processing of your personal data.</p>

            <p className="my-2">To exercise these rights please contact us using the contact details set out in the Contact
              Information section below. If we refuse your request under rights of access, we will provide you
              with a reason as to why. You have the right to complain as outlined in the Complaints section
              below.</p>

            <p className="my-2">If you would like to receive further information concerning the processing of your personal data or
              to ask us to correct, update or delete any personal data relating to you, you may contact us with
              a request to do so at info@henar.am At the same time, to protect your privacy and security, please
              be aware that we may take reasonable steps to verify your identity before taking any steps based
              on your request (e.g., by askin
              g you to indicate the e-mail address that you have previously
              submitted to the Website).</p>
            <h2 className="my-2 font-bold">Basis of Processing Personal Data</h2>
            <p className="my-2">We will only process personal data where we have lawful basis to do so. The lawful basis on
              which data is processed will depend on the nature of the information collected and the purposes
              for which it is used by us but will be one or more of following:</p>
              <p>• Consent: you have provided your consent for us to process your personal data for a
            specific purpose.</p>
            <p>• Contract: the processing is necessary for a contract you have with us or because you
            have asked us to take specific steps before entering into a contract.</p>
            <p>• Legal obligation: the processing is necessary for us to comply with our legal obligations.</p>
            <p>• Vital interests: the processing is necessary to protect someone’s life.</p>
            <p>• Legitimate interests: the processing is necessary for our legitimate interests or the
            legitimate interests of a third party.</p>

            <p className="my-2">For these purposes we may collect your personal data including first name, last name, date of
              birth, nationality, country of residence, email addresses, contacts, data which are automatically
              submitted by using the Website pages (including, IP-address, source of the Website visits and
              information of search or advertising request, data on the user device, the user clicks, hits on the
            elements of the Website pages, page views, data on the banners and videos views, data
              characterizing the audience segments, parameters of a session, information on time and
              duration of a visit, the user identifiers stored in “cookie” files).</p>

            <h2 className="my-2 font-bold">Term for Holding Personal Data</h2>
            <p>We will only retain your personal data for the period necessary to fulfil the purposes for which it
              is collected and processed, or for such shorter or longer period as may be prescribed by
              applicable law. After such time, we will either delete or anonymize your personal data or, if this is
              not possible, we will securely store your personal data and isolate it from any further use until
              deletion is possible.</p>

            <p>You may withdraw your consent on processing your personal data by email using Contact
              Information stated below. Once we have received your notification that you have withdrawn
              consent, we will delete your personal data in the databases hosted internally and (or) externally.</p>

            <h2 className="my-2 font-bold">Security and Responsibility</h2>
            <p>We are not responsible for loss or disclosure of personal data if such data:
              appears in public domain before being lost or disclosed;
              was independently developed by the third parties;
              was obtained by the third parties by means of unauthorized access to the Website files;
              was disclosed with your consent.</p>

            <p>You are responsible for lawfulness, correctness and truthfulness of the submitted personal data
              in accordance with the applicable legislation.</p>

            <h2 className="my-2 font-bold">Contact Information</h2>
            <p>In case of any questions or requests, please contact us at info@henar.am</p>
            <h2 className="my-2 font-bold">Complaints</h2>
            <p>If you wish to make a complaint about how your personal data is being processed by us or how
              your request has been handled, you have the right to lodge a complaint by contacting:
              info@henar.am</p>
            <h2 className="my-2 font-bold">Changes to this Policy</h2>
            <p>We may update or amend this Policy from time to time to comply with law or to meet its changing
              internal policies without notice to you. Any updates will be posted, and the date of recent revisions
              will appear on the Website, so please check this page occasionally to see if you are happy with
              the current edition of the Policy.</p>
            <h2 className="my-2 font-bold">Final Provisions</h2>
            <p>This Policy applies to this Website only. We do not control and is not responsible for the third
              parties’ websites that you may switch to via the links available on this Website.</p>
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

export default PrivacyPage;

