import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const ResetPassword = () => {
  return <div>ResetPassword</div>;
};

export default ResetPassword;

export async function getServerSideProps(context: any) {
  return {
    props: {
      ...(await serverSideTranslations(context.locale, ['common'])),
    },
  };
}
