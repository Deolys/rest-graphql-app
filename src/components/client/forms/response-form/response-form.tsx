import { Descriptions } from 'antd';
import { type JSX, useContext } from 'react';

import { CodeEditor } from '@/components/code-editor';
import { LanguageContext } from '@/providers/language';
import { prettifyJson } from '@/utils/prettify-json';

interface ResponseFormProps {
  responseStatus: string;
  responseBody: string;
}

export function ResponseForm({
  responseStatus,
  responseBody,
}: ResponseFormProps): JSX.Element {
  const { t } = useContext(LanguageContext);

  return (
    <Descriptions
      title={t.response}
      className="Response"
      bordered={true}
      size="small"
      column={1}
    >
      <Descriptions.Item label={t.status} style={{ color: '#1f1f1f' }}>
        {responseStatus}
      </Descriptions.Item>
      <Descriptions.Item
        label={t.body}
        style={{ color: '#1f1f1f' }}
        contentStyle={{
          height: '10em',
          width: '90%',
        }}
      >
        <CodeEditor
          placeholder={t.responseBody}
          readOnly={true}
          value={prettifyJson(responseBody)}
        />
      </Descriptions.Item>
    </Descriptions>
  );
}

export default ResponseForm;
