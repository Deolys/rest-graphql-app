'use client'
import { Header as AntdHeader } from 'antd/es/layout/layout'
import { Image, Button, Switch, Flex } from 'antd'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import style from './header.module.css'
import { pageRoutes } from '@/constants/page-routes'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '@/config/firebase-config'
import { logout } from '@/utils/firebase'

export default function Header() {
  const router = useRouter()
  const [user] = useAuthState(auth)

  const handleSignOut = () => {
    logout()
  }

  const handleLanguage = () => {
    //TODO change language globally
  }

  const handleSignIn = () => {
    router.push(pageRoutes.SIGN_IN)
  }

  return (
    <>
      <AntdHeader className={style.headerStyle}>
        <Flex align="center" gap={20}>
          <Link href={pageRoutes.MAIN}>
            <Image
              width={100}
              height={90}
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
        {user ? (
          <Button onClick={handleSignOut}>Sign out</Button>
        ) : (
          <Button onClick={handleSignIn}>Sign in</Button>
        )}
      </AntdHeader>
    </>
  )
}
