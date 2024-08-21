'use client'
import { useState } from 'react'
import TextArea from 'antd/es/input/TextArea'
import { clientMenu } from '@/constants/client'
import { Button, Descriptions, Flex } from 'antd'
import { InputUrl, Navigation, SelectMethod } from '@/components'
import { FormBody, FormParams, FormHeaders } from '@/components/client/forms'

const forms = {
  [clientMenu[0].key]: FormParams(),
  [clientMenu[1].key]: FormHeaders(),
  [clientMenu[2].key]: FormBody(),
}

export default function Page() {
  const [currentTab, setCurrentTab] = useState(clientMenu[0].key)

  return (
    <div>
      <article style={{ padding: '1em' }}>
        <Flex gap="small" style={{ marginBottom: '1em' }}>
          <SelectMethod />
          <InputUrl />
          <Button type="primary">Send</Button>
        </Flex>
        <Navigation setCurrentTab={setCurrentTab} currentTab={currentTab} />
        {forms[currentTab]}
        <Descriptions title="Response" bordered={true} size="small" column={1}>
          <Descriptions.Item label="Status">200 OK</Descriptions.Item>
          <Descriptions.Item
            label="Body"
            contentStyle={{
              height: '10em',
              width: '90%',
            }}
          >
            <TextArea
              placeholder="Response Body"
              disabled={true}
              style={{
                height: '100%',
              }}
            />
          </Descriptions.Item>
        </Descriptions>
      </article>
    </div>
  )
}
