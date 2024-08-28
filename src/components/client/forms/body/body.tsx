import { jsonParseLinter } from '@codemirror/lang-json';
import { lintGutter, linter } from '@codemirror/lint';
import { Button } from 'antd';
import Image from 'next/image';
import { type JSX, useContext } from 'react';

import { CodeEditor } from '@/components/code-editor';
import { LanguageContext } from '@/providers/language';
import { useAppDispatch } from '@/store/store';
import type { ClientAction } from '@/types/client';
import { prettifyJson } from '@/utils/prettify-json';

type Props = {
  body: string;
  setBody: ClientAction;
};

export function FormBody({ body, setBody }: Props): JSX.Element {
  const { t } = useContext(LanguageContext);
  const dispatch = useAppDispatch();
  const handleBodyChange = (value: string): void => {
    dispatch(setBody(value));
  };

  const handlePrettify = (): void => {
    dispatch(setBody(prettifyJson(body)));
  };

  return (
    <div style={{ position: 'relative' }}>
      <CodeEditor
        value={body}
        onChange={handleBodyChange}
        addExtensions={[linter(jsonParseLinter()), lintGutter()]}
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
