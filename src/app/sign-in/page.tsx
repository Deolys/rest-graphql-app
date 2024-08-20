'use client'

import { Button, Form, Input } from 'antd'
import type { FormProps } from 'antd'
import Title from 'antd/es/typography/Title'
import styles from '@/app/styles/auth-pages.module.css'
import { pageRoutes } from '@/constants/page-routes'

type FieldType = {
  email?: string
  password?: string
}

export default function SignInPage() {
  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('Success:', values)
  }

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (
    errorInfo,
  ) => {
    console.log('Failed:', errorInfo)
  }
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
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Email is required' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Password is required' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item style={{ marginBottom: 4 }}>
          <Button block type="primary" htmlType="submit">
            Submit
          </Button>
          Don&apos;t have an account? <a href={pageRoutes.SIGN_UP}>Register</a>
        </Form.Item>
      </Form>
    </div>
  )
}
