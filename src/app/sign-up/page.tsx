'use client'

import { Button, Form, Input } from 'antd'
import type { FormProps } from 'antd'
import Title from 'antd/es/typography/Title'
import styles from '@/app/styles/auth-pages.module.css'
import { pageRoutes } from '@/constants/page-routes'
import { signUpPasswordRules } from '@/constants/validation-rules'
import { rulesValidator } from '@/utils/rules-validator'
import { registerWithEmailAndPassword } from '@/utils/firebase'
import { FirebaseError } from 'firebase/app'
import { useRouter } from 'next/navigation'

type FieldType = {
  email?: string
  password?: string
}

export default function SignUpPage() {
  const router = useRouter()
  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    const { email, password } = values
    if (!email || !password) {
      return
    }

    const response = await registerWithEmailAndPassword(email, password)
    if (response?.error instanceof FirebaseError) {
      console.log(response.error.message)
    } else {
      router.push(pageRoutes.RESTFULL_CLIENT)
    }
  }

  return (
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
                return rulesValidator(signUpPasswordRules, value)
              },
            }),
          ]}
          validateDebounce={700}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>
        <Form.Item style={{ marginBottom: 4 }}>
          <Button block type="primary" htmlType="submit">
            Submit
          </Button>
          Already have an account? <a href={pageRoutes.SIGN_IN}>Login</a>
        </Form.Item>
      </Form>
    </div>
  )
}
