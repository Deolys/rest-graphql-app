'use client';

import { Button, Flex, Image, Skeleton, Switch } from 'antd';
import { Header as AntdHeader } from 'antd/es/layout/layout';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { type JSX, useContext } from 'react';
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
      <AntdHeader className={style.headerStyle}>
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
            checkedChildren="en"
            unCheckedChildren="ru"
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
                <Button onClick={handleSignOut}>{t.signOut}</Button>
              </>
            ) : (
              <>
                <Button type="primary" onClick={handleSignIn}>
                  {t.signIn}
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
