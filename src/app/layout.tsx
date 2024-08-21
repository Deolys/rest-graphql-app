import type { Metadata } from 'next'
import { Layout } from 'antd'
import Header from '@/components/header/header'
import Footer from '@/components/footer/footer'
import './globals.css'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import { Content } from 'antd/es/layout/layout'

export const metadata: Metadata = {
  title: 'REST/GraphiQL Client',
  description:
    'Light-weight versions of Postman and GrqphiQL combined in one app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <AntdRegistry>
          <Layout>
            <Header />
            <Content>{children}</Content>
            <Footer />
          </Layout>
        </AntdRegistry>
      </body>
    </html>
  )
}
