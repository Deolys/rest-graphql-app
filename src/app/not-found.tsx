'use client';

import { Flex, Image } from 'antd';
import { type JSX, useContext } from 'react';

import { LanguageContext } from '@/providers/language';

export default function Page404(): JSX.Element {
  const { t } = useContext(LanguageContext);
  return (
    <Flex align="center" vertical>
      <div style={{ alignItems: 'center' }}>
        <span style={{ fontSize: '280px' }}>4</span>
        <Image
          src="/graphql-rest-logo.svg"
          width={200}
          alt="404"
          preview={false}
        />
        <span style={{ fontSize: '280px' }}>4</span>
      </div>
      <h1>{t.pageNotFound}</h1>
    </Flex>
  );
}
