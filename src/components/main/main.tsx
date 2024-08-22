'use client';

import type { JSX } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Spin } from 'antd';
import styles from './main.module.css';
import { pageRoutes } from '@/constants/page-routes';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/config/firebase-config';
import { useContext } from 'react';
import { LanguageContext } from '@/providers/language';

export default function Main(): JSX.Element {
  const router = useRouter();
  const { t } = useContext(LanguageContext);
  const [user, loading] = useAuthState(auth);
  const userName = user?.displayName;

  const handleNavigate = (path: string): void => {
    router.push(path);
  };

  return (
    <div className={styles.mainContainer}>
      {loading ? (
        <Spin />
      ) : user ? (
        <>
          <h1>
            {t.welcomeBack}, {userName}!
          </h1>
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
          <h1>{t.welcome}</h1>
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
