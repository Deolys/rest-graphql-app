'use client';

import type { JSX } from 'react';
import { Header as AntdHeader } from 'antd/es/layout/layout';
import { Image, Button, Switch, Flex, Skeleton } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import style from './header.module.css';
import { pageRoutes } from '@/constants/page-routes';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/config/firebase-config';
import { logout } from '@/utils/firebase';
import { useContext } from 'react';
import { LanguageContext } from '@/providers/language';

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

  return (
    <>
      <AntdHeader className={style.headerStyle}>
        <Flex align="center" gap={20}>
          <Link href={pageRoutes.MAIN}>
            <Image
              width={100}
              height={90}
              src="/rest_graph.jpg"
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
                'linear-gradient(90deg, #ffffff 25%, #ffffff 37%, #d3d3d3 63%)',
              marginTop: 16,
            }}
          />
        ) : user ? (
          <Button onClick={handleSignOut}>{t.signOut}</Button>
        ) : (
          <Button onClick={handleSignIn}>{t.signIn}</Button>
        )}
      </AntdHeader>
    </>
  );
}
