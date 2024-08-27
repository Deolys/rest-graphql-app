import { Button } from 'antd';
import Image from 'next/image';
import { type JSX } from 'react';

import { CodeEditor } from '@/components/code-editor';
import { useAppDispatch } from '@/store/store';
import type { ClientAction } from '@/types/client';
import { prettifyJson } from '@/utils/prettify-json';

type Props = {
  body: string;
  setBody: ClientAction;
};

export function FormBody({ body, setBody }: Props): JSX.Element {
  const dispatch = useAppDispatch();
  const handleBodyChange = (value: string): void => {
    dispatch(setBody(value));
  };

  const handlePrettify = (): void => {
    dispatch(setBody(prettifyJson(body)));
  };

  return (
    <div style={{ position: 'relative' }}>
      <CodeEditor value={body} onChange={handleBodyChange} />
      <Button
        onClick={handlePrettify}
        style={{ position: 'absolute', top: 0, right: 0 }}
      >
        <Image width={30} height={30} src="/prettify-icon.svg" alt="prettify" />
      </Button>
    </div>
  );
}
