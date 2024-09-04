'use client';

import { Flex, Spin } from 'antd';
import { type JSX } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

import { CourseInfo, DevelopersList, ProjectInfo } from '@/components';
import Main from '@/components/main/main';
import { auth } from '@/config/firebase-config';

import styles from './main-page.module.css';

export function MainPage(): JSX.Element {
  const [, loading] = useAuthState(auth);

  return (
    <>
      {loading ? (
        <Flex justify="center" align="center" style={{ height: '40vh' }}>
          <Spin size="large" />
        </Flex>
      ) : (
        <>
          <section className={styles.backgroundImage}>
            <Main />
          </section>
          <section className={styles.section}>
            <ProjectInfo />
          </section>
          <section className={styles.section}>
            <DevelopersList />
          </section>
          <section className={styles.section}>
            <CourseInfo />
          </section>
        </>
      )}
    </>
  );
}

export default MainPage;
