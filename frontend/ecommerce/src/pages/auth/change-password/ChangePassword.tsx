import React from 'react'
import ManagementLayout from '@layout/ManagementLayout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const ChangePassword = ():React.ReactElement => {
  return (
    <div>ChangePassword</div>
  )
}

ChangePassword.getLayout = function getLayout(page: React.ReactNode) {
  return <ManagementLayout>{page}</ManagementLayout>;
};

export default ChangePassword

export async function getServerSideProps(context: any) {
  return {
    props: {
      ...(await serverSideTranslations(context.locale, ['common'])),
    },
  };
}