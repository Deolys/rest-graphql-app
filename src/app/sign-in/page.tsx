'use client';

import type { JSX } from 'react';
import { Button, Form, Input } from 'antd';
import type { FormProps } from 'antd';
import Title from 'antd/es/typography/Title';
import styles from '@/app/styles/auth-pages.module.css';
import { pageRoutes } from '@/constants/page-routes';
import { useRouter } from 'next/navigation';
import { logInWithEmailAndPassword } from '@/utils/firebase';
import { FirebaseError } from 'firebase/app';
import { useState } from 'react';
import { getErrorByCodeFB } from '@/utils/get-error-by-code-fb';

type FieldType = {
  email?: string;
  password?: string;
};

export default function SignInPage(): JSX.Element {
  const router = useRouter();
  const [loginError, setLoginError] = useState('');
  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    const { email, password } = values;
    if (!email || !password) {
      return;
    }

    const response = await logInWithEmailAndPassword(email, password);
    if (response?.error instanceof FirebaseError) {
      const errorMessage = getErrorByCodeFB(response.error.code);
      setLoginError(errorMessage);
    } else {
      router.push(pageRoutes.RESTFULL_CLIENT);
    }
  };

  return (
    <div className={styles.formWrapper}>
      <Title level={2} style={{ textAlign: 'center' }}>
        Sign In
      </Title>
      <Form
        name="sign-in"
        layout={'vertical'}
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item<FieldType>
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Email is required' },
            {
              type: 'email',
              message: 'Please enter a valid email',
            },
          ]}
          validateDebounce={700}
          hasFeedback
        >
          <Input />
        </Form.Item>
        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Password is required' }]}
          validateDebounce={700}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>
        <Form.Item validateStatus="error" help={loginError}>
          <Button block type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
        Don&apos;t have an account? <a href={pageRoutes.SIGN_UP}>Register</a>
      </Form>
    </div>
  );
}
