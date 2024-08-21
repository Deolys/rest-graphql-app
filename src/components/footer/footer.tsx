import { Image, Dropdown } from 'antd'
import { Footer as AntdFooter } from 'antd/es/layout/layout'
import { footerStyle } from './style'
import { coders } from '@/constants/coders'

export default function Footer() {
  return (
    <AntdFooter style={footerStyle}>
      <Dropdown
        menu={{
          items: coders,
        }}
        placement="topRight"
      >
        <Image width={50} src="/github.png " preview={false} />
      </Dropdown>

      <p>© 2024 REST/GraphiQL Client</p>
      <a
        href="https://rs.school/courses/reactjs"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image width={50} src="/rss-logo.svg " preview={false} />
      </a>
    </AntdFooter>
  )
}
