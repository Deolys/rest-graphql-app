'use client'
import { Header as AntdHeader } from 'antd/es/layout/layout'
import { Image, Button, Switch } from 'antd'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { headerStyle, logoStyle, switchStyle } from './style'

export default function Header() {
  const router = useRouter()
  const isAuthorized = false // TODO Take authorization from state

  const handleSignOut = () => {
    // TODO Sign out
  }

  const handleLanguage = () => {
    //TODO change language globally
  }

  const handleSignIn = () => {
    router.push('/login')
  }

  return (
    <>
      <AntdHeader style={headerStyle}>
        <div>
          <Link href="/" style={logoStyle}>
            <Image width={100} src="/rest_graph.jpg" preview={false} />
          </Link>
          <Switch
            style={switchStyle}
            checkedChildren="ru"
            unCheckedChildren="en"
            onChange={handleLanguage}
            defaultChecked
          />
        </div>
        {!isAuthorized && <Button onClick={handleSignIn}>Sign in</Button>}
        {isAuthorized && <Button onClick={handleSignOut}>Sign out</Button>}
      </AntdHeader>
    </>
  )
}
