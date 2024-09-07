'use client';

import { Flex, Spin } from 'antd';
import Title from 'antd/es/typography/Title';
import Image from 'next/image';
import { type JSX, useContext } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

import handsArrow from '@/assets/images/hands-arrow.svg';
import handsBook from '@/assets/images/hands-book.svg';
import { CourseInfo, DevelopersList, ProjectInfo } from '@/components';
import Main from '@/components/main/main';
import { auth } from '@/config/firebase-config';
import { LanguageContext } from '@/providers/language';

import styles from './main-page.module.css';

export function MainPage(): JSX.Element {
  const [, loading] = useAuthState(auth);
  const { t } = useContext(LanguageContext);

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
            <Flex justify="center" align="center">
              <Image src={handsArrow} alt="Arrow" width={40} height={32} />
              <Title level={3} style={{ marginBottom: 4, marginLeft: 8 }}>
                {t.developers}
              </Title>
            </Flex>
            <DevelopersList />
          </section>
          <section className={styles.section}>
            <Flex justify="center" align="center" style={{ marginBottom: 30 }}>
              <Image src={handsBook} alt="Book" width={40} height={32} />
              <Title level={3} style={{ marginBottom: 4, marginLeft: 8 }}>
                {t.aboutCourseTitle}
              </Title>
            </Flex>
            <CourseInfo />
          </section>
        </>
      )}
    </>
  );
}

export default MainPage;
