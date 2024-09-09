import { AntdRegistry } from '@ant-design/nextjs-registry';
import { Layout } from 'antd';
import { Content } from 'antd/es/layout/layout';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import { ErrorBoundary, ErrorPage } from '@/components';
import Footer from '@/components/footer/footer';
import Header from '@/components/header/header';
import Providers from '@/providers/providers';

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
      <head>
        <link rel="icon" href="/graphql-rest-logo.svg" type="image/svg+xml" />
      </head>
      <body>
        <Providers>
          <AntdRegistry>
            <ErrorBoundary fallback={<ErrorPage />}>
              <Layout>
                <Header />
                <Content
                  style={{
                    background:
                      'linear-gradient(90deg, rgba(216,200,255,1) 0%, rgba(224,224,255,1) 35%, rgba(174,242,255,1) 100%)',
                  }}
                >
                  {children}
                </Content>
                <Footer />
              </Layout>
            </ErrorBoundary>
          </AntdRegistry>
        </Providers>
      </body>
    </html>
  );
}
