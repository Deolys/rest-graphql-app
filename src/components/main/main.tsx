'use client';

import { Button, Flex } from 'antd';
import Title from 'antd/es/typography/Title';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { type JSX, useContext } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

import handsHeart from '@/assets/images/hands-heart.svg';
import { auth } from '@/config/firebase-config';
import { pageRoutes } from '@/constants/page-routes';
import { LanguageContext } from '@/providers/language';

import styles from './main.module.css';

export default function Main(): JSX.Element {
  const router = useRouter();
  const { t } = useContext(LanguageContext);
  const [user] = useAuthState(auth);
  const userName = user?.displayName;

  const handleNavigate = (path: string): void => {
    router.push(path);
  };

  return (
    <div className={styles.mainContainer}>
      {user ? (
        <>
          <Flex align="center" style={{ marginBottom: 19 }}>
            <Title style={{ marginBottom: 0 }}>
              {t.welcomeBack},{' '}
              <span className={styles.iridescent}>{userName}</span>!
            </Title>
            <Image src={handsHeart} alt="Heart" />
          </Flex>
          <div className={styles.buttonsContainer}>
            <Button onClick={() => handleNavigate(pageRoutes.RESTFULL_CLIENT)}>
              {t.restClient}
            </Button>
            <Button onClick={() => handleNavigate(pageRoutes.GRAPHQL)}>
              {t.graphqlClient}
            </Button>
            <Button onClick={() => handleNavigate(pageRoutes.HISTORY)}>
              {t.history}
            </Button>
          </div>
        </>
      ) : (
        <>
          <Title>{t.welcome}</Title>
          <div className={styles.buttonsContainer}>
            <Button onClick={() => handleNavigate(pageRoutes.SIGN_IN)}>
              {t.signIn}
            </Button>
            <Button onClick={() => handleNavigate(pageRoutes.SIGN_UP)}>
              {t.signUp}
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
