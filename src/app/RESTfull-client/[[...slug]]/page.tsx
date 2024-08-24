'use client';

import { Button, Descriptions, Flex } from 'antd';
import { type JSX, useContext, useState } from 'react';

import { InputUrl, Navigation, SelectMethod } from '@/components';
import { FormBody, FormHeaders, Params } from '@/components/client/forms';
import { FormVariables } from '@/components/client/forms/variables/variables';
import { CodeEditor } from '@/components/code-editor';
import { clientMenu } from '@/constants/client';
import { LanguageContext } from '@/providers/language';

export default function Page(): JSX.Element {
  const [currentTab, setCurrentTab] = useState(clientMenu[0].key);
  const { t } = useContext(LanguageContext);

  const forms = {
    [clientMenu[0].key]: Params(),
    [clientMenu[1].key]: FormHeaders(t),
    [clientMenu[2].key]: FormVariables(),
    [clientMenu[3].key]: FormBody(),
  };

  return (
    <article style={{ padding: '1em' }}>
      <Flex gap="small" style={{ marginBottom: '1em' }}>
        <SelectMethod />
        <InputUrl />
        <Button type="primary">{t.send}</Button>
      </Flex>
      <Navigation setCurrentTab={setCurrentTab} currentTab={currentTab} />
      {forms[currentTab]}
      <Descriptions
        title={t.response}
        className="Response"
        bordered={true}
        size="small"
        column={1}
      >
        <Descriptions.Item label={t.status}>200 OK</Descriptions.Item>
        <Descriptions.Item
          label={t.body}
          contentStyle={{
            height: '10em',
            width: '90%',
          }}
        >
          <CodeEditor placeholder={t.responseBody} readOnly={true} />
        </Descriptions.Item>
      </Descriptions>
    </article>
  );
}
