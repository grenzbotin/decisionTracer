import React from 'react';
import useTranslation from 'next-translate/useTranslation';
import dynamic from 'next/dynamic';

const HtmlHeader = dynamic(() => import('../components/HtmlHeader'));
const Calculator = dynamic(() => import('../components/Calculator'));
const Result = dynamic(() => import('../components/Result'));

export default function Home() {
  const { t } = useTranslation('home');
  return (
    <>
      <HtmlHeader
        title={t('meta.title')}
        description={t('meta.description')}
        keywords={t('meta.keywords')}
      />
      <Calculator />
      <Result />
    </>
  );
}
