import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { Layout } from 'antd';
import Header from '@/components/header/header';
import Footer from '@/components/footer/footer';
import './globals.css';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { Content } from 'antd/es/layout/layout';
import { LanguageProvider } from '@/providers/language';

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
        <LanguageProvider>
          <AntdRegistry>
            <Layout>
              <Header />
              <Content>{children}</Content>
              <Footer />
            </Layout>
          </AntdRegistry>
        </LanguageProvider>
      </body>
    </html>
  );
}
