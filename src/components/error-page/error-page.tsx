'use client';

import { Button, Flex } from 'antd';
import Layout, { Content } from 'antd/es/layout/layout';
import Title from 'antd/es/typography/Title';
import { useRouter } from 'next/navigation';
import { type JSX, useContext } from 'react';

import { pageRoutes } from '@/constants/page-routes';
import { LanguageContext } from '@/providers/language';

export function ErrorPage(): JSX.Element {
  const router = useRouter();
  const { t } = useContext(LanguageContext);
  const handleMainPage = (): void => {
    router.push(pageRoutes.MAIN);
  };
  return (
    <Layout>
      <Content>
        <Flex
          justify="center"
          align="center"
          vertical
          style={{ height: '100vh' }}
        >
          <Title level={3}>{t.somethingWentWrong}</Title>
          <Button type="primary" onClick={handleMainPage}>
            {t.mainPage}
          </Button>
        </Flex>
      </Content>
    </Layout>
  );
}
