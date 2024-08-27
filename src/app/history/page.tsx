'use client';

import { Button, List } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

import { auth } from '@/config/firebase-config';
import type { methods } from '@/constants/client';
import { pageRoutes } from '@/constants/page-routes';
import { withAuth } from '@/hoc/with-auth';
import { LanguageContext } from '@/providers/language';
import { setFormInited } from '@/store/reducers/rest-request-slice';
import type { MethodsValues } from '@/types/client';

import styles from './history.module.css';

type Data = {
  date: string;
  method: (typeof methods)[MethodsValues];
  url: string;
  encodedURL: string;
};

function HistoryPage(): JSX.Element {
  const { t } = useContext(LanguageContext);
  const router = useRouter();
  const [user] = useAuthState(auth);
  const [requests, setRequests] = useState<Data[]>([]);

  useEffect(() => {
    const requestsLS = localStorage.getItem(`reqHist-${user?.uid}`) as string;
    setRequests(JSON.parse(requestsLS));
    setFormInited(false);
  }, [user]);

  const handleNavigate = (path: string): void => {
    router.push(path);
  };

  return (
    <>
      {requests ? (
        <article style={{ padding: '1em' }}>
          <List
            size="large"
            header={
              <h1 style={{ textAlign: 'center' }}>{t.historyRequests}</h1>
            }
            bordered
            dataSource={requests}
            renderItem={(item) => (
              <List.Item>
                <div>
                  <span style={{ paddingRight: '0.5em' }}>{item.date}:</span>
                  <span style={{ paddingRight: '0.5em' }}>[{item.method}]</span>
                  <Link href={item.encodedURL}>{item.url}</Link>
                </div>
              </List.Item>
            )}
          />
        </article>
      ) : (
        <div className={styles.mainContainer}>
          <h1>{t.historyEmpty}</h1>
          <div className={styles.buttonsContainer}>
            <Button onClick={() => handleNavigate(pageRoutes.RESTFULL_CLIENT)}>
              {t.restClient}
            </Button>
            <Button onClick={() => handleNavigate(pageRoutes.GRAPHQL)}>
              {t.graphqlClient}
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

export default withAuth(HistoryPage);
