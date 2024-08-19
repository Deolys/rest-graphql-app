import Link from 'next/link'
import { Layout } from 'antd'

import { Content, Footer, Header } from 'antd/es/layout/layout'

export default function Home() {
  return (
    <Layout>
      <Header>Header</Header>
      <Content>
        <main>
          Welcome page
          <ul>
            <li>
              <Link href="/login">Login page</Link>
            </li>
            <li>
              <Link href="/signup">Registration page</Link>
            </li>
            <li>
              <Link href="/main">Main</Link>
            </li>
          </ul>
        </main>
      </Content>
      <Footer>Footer</Footer>
    </Layout>
  )
}
