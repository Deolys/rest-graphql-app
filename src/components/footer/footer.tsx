import { Image, Dropdown } from 'antd'
import { Footer as AntdFooter } from 'antd/es/layout/layout'
import { footerStyle } from './style'

export default function Footer() {
  const coders = [
    {
      key: '1',
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/algoritmiks"
        >
          @algoritmiks
        </a>
      ),
    },
    {
      key: '2',
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/Deolys"
        >
          @Deolys
        </a>
      ),
    },
    {
      key: '3',
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/K98940"
        >
          @K98940
        </a>
      ),
    },
  ]

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
