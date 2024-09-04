import { jsonParseLinter } from '@codemirror/lang-json';
import { lintGutter, linter } from '@codemirror/lint';
import { Button, message } from 'antd';
import { graphql } from 'cm6-graphql';
import type { GraphQLSchema } from 'graphql';
import Image from 'next/image';
import { type JSX, useContext, useRef } from 'react';

import { CodeEditor } from '@/components/code-editor';
import { LanguageContext } from '@/providers/language';
import { useAppDispatch } from '@/store/store';
import type { ClientAction } from '@/types/client';
import { prettifyGraphQL } from '@/utils/prettify-graphql';
import { prettifyJson } from '@/utils/prettify-json';

type Props = {
  body: string;
  setBody: ClientAction;
  schema?: GraphQLSchema | undefined;
  isGraphQL?: boolean;
};

export function FormBody({
  body,
  setBody,
  schema,
  isGraphQL = false,
}: Props): JSX.Element {
  const { t } = useContext(LanguageContext);
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useAppDispatch();
  const valueRef = useRef(body);

  const handleBodyChange = (value: string): void => {
    valueRef.current = value;
  };

  const handleBlur = (): void => {
    dispatch(setBody(valueRef.current));
  };

  const handlePrettify = (): void => {
    const prettified = isGraphQL ? prettifyGraphQL(body) : prettifyJson(body);
    if (prettified instanceof Error) {
      messageApi.open({
        type: 'warning',
        duration: 10,
        content: `${prettified}`,
      });
    } else {
      dispatch(setBody(prettified));
      valueRef.current = prettified;
    }
  };

  const extensions = isGraphQL
    ? schema
      ? [graphql(schema)]
      : []
    : [linter(jsonParseLinter()), lintGutter()];

  return (
    <div style={{ position: 'relative' }}>
      {contextHolder}
      <CodeEditor
        value={body}
        onChange={handleBodyChange}
        onBlur={handleBlur}
        addExtensions={extensions}
      />
      <Button
        onClick={handlePrettify}
        style={{ position: 'absolute', top: 0, right: 0 }}
        title={t.prettify}
      >
        <Image width={30} height={30} src="/prettify-icon.svg" alt="prettify" />
      </Button>
    </div>
  );
}
