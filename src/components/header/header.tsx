'use client';

import { LoginOutlined, LogoutOutlined } from '@ant-design/icons';
import { Button, Flex, Image, Skeleton, Switch } from 'antd';
import { Header as AntdHeader } from 'antd/es/layout/layout';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { type JSX, useContext, useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

import { auth } from '@/config/firebase-config';
import { pageRoutes } from '@/constants/page-routes';
import { LanguageContext } from '@/providers/language';
import { logout } from '@/utils/firebase';

import style from './header.module.css';

export default function Header(): JSX.Element {
  const router = useRouter();
  const [user, loading] = useAuthState(auth);
  const { toggleLanguage, t } = useContext(LanguageContext);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScroll = (): void => {
    setScrollPosition(window.scrollY);
  };

  const handleSignOut = (): void => {
    logout();
  };

  const handleLanguage = (): void => {
    toggleLanguage();
  };

  const handleSignIn = (): void => {
    router.push(pageRoutes.SIGN_IN);
  };

  const handleSignUp = (): void => {
    router.push(pageRoutes.SIGN_UP);
  };

  const handleMainPage = (): void => {
    router.push(pageRoutes.MAIN);
  };

  return (
    <>
      <AntdHeader
        className={style.headerStyle}
        style={
          scrollPosition === 0
            ? {}
            : {
                borderBottom: '1px solid #cbcbcb',
                background: 'rgba(217, 217, 217, 0.2)',
                backdropFilter: 'blur(40px)',
                WebkitBackdropFilter: 'blur(40px)',
                boxShadow: 'rgba(0, 0, 0, 0.2) 0 0 20px',
              }
        }
      >
        <Flex align="center" gap={20}>
          <Link className={style.link} href={pageRoutes.MAIN}>
            <Image
              width={50}
              height={50}
              src="/graphql-rest-logo.svg"
              alt="REST GraphQL logo"
              preview={false}
            />
          </Link>
          <Switch
            className={style.switchStyle}
            checkedChildren="EN"
            unCheckedChildren="RU"
            onChange={handleLanguage}
            defaultChecked
          />
        </Flex>
        {loading ? (
          <Skeleton.Button
            active
            style={{
              backgroundImage:
                'linear-gradient(90deg, #ffffff 25%, #ffffff 37%, #bdbdbd 63%)',
              marginTop: 16,
            }}
          />
        ) : (
          <Flex gap="small" wrap>
            {user ? (
              <>
                <Button type="primary" onClick={handleMainPage}>
                  {t.mainPage}
                </Button>
                <Button onClick={handleSignOut}>
                  {t.signOut}
                  <LogoutOutlined />
                </Button>
              </>
            ) : (
              <>
                <Button type="primary" onClick={handleSignIn}>
                  {t.signIn}
                  <LoginOutlined />
                </Button>
                <Button onClick={handleSignUp}>{t.signUp}</Button>
              </>
            )}
          </Flex>
        )}
      </AntdHeader>
    </>
  );
}
