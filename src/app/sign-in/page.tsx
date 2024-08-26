'use client';

import { Button, Form, type FormProps, Input, message } from 'antd';
import Title from 'antd/es/typography/Title';
import { FirebaseError } from 'firebase/app';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { type JSX, useContext } from 'react';

import styles from '@/app/styles/auth-pages.module.css';
import { pageRoutes } from '@/constants/page-routes';
import { LanguageContext } from '@/providers/language';
import { logInWithEmailAndPassword } from '@/utils/firebase';
import { getErrorByCodeFB } from '@/utils/get-error-by-code-fb';

type FieldType = {
  email?: string;
  password?: string;
};

export default function SignInPage(): JSX.Element {
  const router = useRouter();
  const { t } = useContext(LanguageContext);
  const [messageApi, contextHolder] = message.useMessage();
  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    const { email, password } = values;
    if (!email || !password) {
      return;
    }

    const response = await logInWithEmailAndPassword(email, password);
    if (response?.error instanceof FirebaseError) {
      const errorMessage = getErrorByCodeFB(response.error.code);
      messageApi.open({
        type: 'error',
        content: t[errorMessage],
      });
    } else {
      router.push(pageRoutes.MAIN);
    }
  };

  return (
    <>
      {contextHolder}
      <div className={styles.formWrapper}>
        <Title level={2} style={{ textAlign: 'center' }}>
          {t.signIn}
        </Title>
        <Form
          name="sign-in"
          layout={'vertical'}
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item<FieldType>
            label={t.email}
            name="email"
            rules={[
              { required: true, message: t.emailRequired },
              {
                type: 'email',
                message: t.validEmail,
              },
            ]}
            validateDebounce={700}
            hasFeedback
          >
            <Input />
          </Form.Item>
          <Form.Item<FieldType>
            label={t.password}
            name="password"
            rules={[{ required: true, message: t.passwordRequired }]}
            validateDebounce={700}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>
          <Button block type="primary" htmlType="submit">
            {t.submit}
          </Button>
          {t.dontHaveAccount}{' '}
          <Link href={pageRoutes.SIGN_UP}>{t.register}</Link>
        </Form>
      </div>
    </>
  );
}
