import React from 'react';
import ManagementLayout from '@layout/ManagementLayout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

const Profile = (): React.ReactElement => {
  const { t } = useTranslation('common');
  return <div>{t('manage.profile')}</div>;
};

Profile.getLayout = function getLayout(page: React.ReactNode) {
  return <ManagementLayout>{page}</ManagementLayout>;
};

export default Profile;

export async function getServerSideProps(context: any) {
  return {
    props: {
      ...(await serverSideTranslations(context.locale, ['common'])),
    },
  };
}
