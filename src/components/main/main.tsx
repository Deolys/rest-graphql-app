'use client';

import type { JSX } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from 'antd';
import styles from './main.module.css';
import { pageRoutes } from '@/constants/page-routes';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/config/firebase-config';

export default function Main(): JSX.Element {
  const router = useRouter();
  const [user] = useAuthState(auth);
  const userName = user?.email?.split('@')[0];

  const handleNavigate = (path: string): void => {
    router.push(path);
  };

  return (
    <div className={styles.mainContainer}>
      {user ? (
        <>
          <h1>Wellcome back, {userName}!</h1>
          <div className={styles.buttonsContainer}>
            <Button onClick={() => handleNavigate(pageRoutes.RESTFULL_CLIENT)}>
              REST Client
            </Button>
            <Button onClick={() => handleNavigate(pageRoutes.GRAPHQL)}>
              GraphiQL Client
            </Button>
            <Button onClick={() => handleNavigate(pageRoutes.HISTORY)}>
              History
            </Button>
          </div>
        </>
      ) : (
        <>
          <h1>Wellcome to REST/GraphiQL Client</h1>
          <div className={styles.buttonsContainer}>
            <Button onClick={() => handleNavigate(pageRoutes.SIGN_IN)}>
              Sign in
            </Button>
            <Button onClick={() => handleNavigate(pageRoutes.SIGN_UP)}>
              Sign up
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
