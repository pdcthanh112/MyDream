import { ReactNode } from 'react';
import clsx from 'clsx';
import { Inter } from 'next/font/google';
import { notFound } from 'next/navigation';
import { createTranslator, NextIntlClientProvider } from 'next-intl';
// import Navigation from 'components/Navigation';

const inter = Inter({ subsets: ['latin'] });

type Props = {
  children: ReactNode;
  params: { locale: string };
};

async function getMessages(locale: string) {
  try {
    return (await import(`../../i18n/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }
}

export async function generateStaticParams() {
  return ['en', 'vi', 'zn', 'es'].map((locale) => ({ locale }));
}

export async function generateMetadata({ params: { locale } }: Props) {
  const messages = await getMessages(locale);

  const t = createTranslator({ locale, messages });

  return {
    title: t('Common.title'),
  };
}

export default async function LocaleLayout({ children, params: { locale } }: Props) {
  const messages = await getMessages(locale);

  return (
    // <html className="h-full" lang={locale}>
    //   <body className={clsx(inter.className, 'flex h-full flex-col')}>
        // <NextIntlClientProvider locale={locale} messages={messages}>
        //   {/* <Navigation /> */}
          <div>{children}</div>
        // </NextIntlClientProvider>
    //   </body>
    // </html>
  );
}
