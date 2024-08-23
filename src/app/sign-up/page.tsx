'use client';

import { type JSX, useState, useContext } from 'react';
import { Button, Form, Input, message, type FormProps } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Title from 'antd/es/typography/Title';
import { FirebaseError } from 'firebase/app';
import { pageRoutes } from '@/constants/page-routes';
import { signUpPasswordRules } from '@/constants/validation-rules';
import { rulesValidator } from '@/utils/rules-validator';
import { registerWithEmailAndPassword } from '@/utils/firebase';
import { PasswordStrength } from '@/components/password-strength';
import { getErrorByCodeFB } from '@/utils/get-error-by-code-fb';
import { LanguageContext } from '@/providers/language';
import styles from '@/app/styles/auth-pages.module.css';

type FieldType = {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
};

export default function SignUpPage(): JSX.Element {
  const router = useRouter();
  const { t } = useContext(LanguageContext);
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
          {t.signUp}
        </Title>
        <Form
          name="sign-up"
          layout={'vertical'}
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item<FieldType>
            label={t.name}
            name="name"
            rules={[{ required: true, message: t.nameRequired }]}
            validateDebounce={700}
            hasFeedback
          >
            <Input />
          </Form.Item>
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
            rules={[
              { required: true, message: t.passwordRequired },
              () => ({
                validator(_, value) {
                  setPasswordValue(value);
                  const result = rulesValidator(signUpPasswordRules, value);
                  return new Promise((resolve, reject) => {
                    result.success
                      ? resolve('')
                      : reject(t[result.message || '']);
                  });
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
            label={t.confirmPassword}
            name="confirmPassword"
            dependencies={['password']}
            rules={[
              { required: true, message: t.confirmPassword },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(t.passwordsMatch);
                },
              }),
            ]}
            validateDebounce={700}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>
          <Button block type="primary" htmlType="submit">
            {t.submit}
          </Button>
          {t.haveAccount} <Link href={pageRoutes.SIGN_IN}>{t.login}</Link>
        </Form>
      </div>
    </>
  );
}
