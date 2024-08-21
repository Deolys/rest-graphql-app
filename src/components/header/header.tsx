'use client'
import { Header as AntdHeader } from 'antd/es/layout/layout'
import { Image, Button, Switch, Flex } from 'antd'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import style from './header.module.css'

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
      <AntdHeader className={style.headerStyle}>
        <Flex align="center" gap={20}>
          <Link href="/">
            <Image
              width={100}
              height={75}
              src="/rest_graph.jpg"
              preview={false}
            />
          </Link>
          <Switch
            className={style.switchStyle}
            checkedChildren="ru"
            unCheckedChildren="en"
            onChange={handleLanguage}
            defaultChecked
          />
        </Flex>
        {isAuthorized ? (
          <Button onClick={handleSignOut}>Sign out</Button>
        ) : (
          <Button onClick={handleSignIn}>Sign in</Button>
        )}
      </AntdHeader>
    </>
  )
}
