import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import { Layout } from 'antd'
import { Content, Footer, Header } from 'antd/es/layout/layout'

const inter = Inter({ subsets: ['latin'] })

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
      <body className={inter.className}>
        <AntdRegistry>
          <Layout>
            <Header>Header</Header>
            <Content>
              <main>{children}</main>
            </Content>
            <Footer>Footer</Footer>
          </Layout>
        </AntdRegistry>
      </body>
    </html>
  )
}
