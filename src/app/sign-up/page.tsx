'use client';

import type { JSX } from 'react';
import { Button, Form, Input, message } from 'antd';
import type { FormProps } from 'antd';
import Title from 'antd/es/typography/Title';
import styles from '@/app/styles/auth-pages.module.css';
import { pageRoutes } from '@/constants/page-routes';
import { signUpPasswordRules } from '@/constants/validation-rules';
import { rulesValidator } from '@/utils/rules-validator';
import { registerWithEmailAndPassword } from '@/utils/firebase';
import { FirebaseError } from 'firebase/app';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { PasswordStrength } from '@/components/password-strength';
import { getErrorByCodeFB } from '@/utils/get-error-by-code-fb';

type FieldType = {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
};

export default function SignUpPage(): JSX.Element {
  const router = useRouter();
  const [messageApi, contextHolder] = message.useMessage();
  const [passwordValue, setPasswordValue] = useState('');
  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    const { name, email, password } = values;
    if (!name || !email || !password) {
      return;
    }

    const response = await registerWithEmailAndPassword(name, email, password);
    if (response?.error instanceof FirebaseError) {
      const errorMessage = getErrorByCodeFB(response.error.code);
      messageApi.open({
        type: 'error',
        content: errorMessage,
      });
    } else {
      router.push(pageRoutes.RESTFULL_CLIENT);
    }
  };

  return (
    <>
      {contextHolder}
      <div className={styles.formWrapper}>
        <Title level={2} style={{ textAlign: 'center' }}>
          Sign Up
        </Title>
        <Form
          name="sign-up"
          layout={'vertical'}
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item<FieldType>
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Name is required' }]}
            validateDebounce={700}
            hasFeedback
          >
            <Input />
          </Form.Item>
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
            rules={[
              { required: true, message: 'Password is required' },
              () => ({
                validator(_, value) {
                  setPasswordValue(value);
                  return rulesValidator(signUpPasswordRules, value);
                },
              }),
            ]}
            validateDebounce={700}
            hasFeedback
          >
            <div>
              <Input.Password />
              <PasswordStrength password={passwordValue} />
            </div>
          </Form.Item>
          <Form.Item<FieldType>
            label="Confirm password"
            name="confirmPassword"
            rules={[
              { required: true, message: 'Confirm your password' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject('Passwords do not match');
                },
              }),
            ]}
            validateDebounce={700}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>
          <Button block type="primary" htmlType="submit">
            Submit
          </Button>
          Already have an account? <a href={pageRoutes.SIGN_IN}>Login</a>
        </Form>
      </div>
    </>
  );
}
