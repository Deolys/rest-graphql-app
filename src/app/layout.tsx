import { AntdRegistry } from '@ant-design/nextjs-registry';
import { Layout } from 'antd';
import { Content } from 'antd/es/layout/layout';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import Footer from '@/components/footer/footer';
import Header from '@/components/header/header';
import { LanguageProvider } from '@/providers/language';
import StoreProvider from '@/store/storeProvider';

import './globals.css';

export const metadata: Metadata = {
  title: 'REST/GraphiQL Client',
  description:
    'Light-weight versions of Postman and GrqphiQL combined in one app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>): ReactNode {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          <LanguageProvider>
            <AntdRegistry>
              <Layout>
                <Header />
                <Content>{children}</Content>
                <Footer />
              </Layout>
            </AntdRegistry>
          </LanguageProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
