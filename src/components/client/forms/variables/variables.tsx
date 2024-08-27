import { jsonParseLinter } from '@codemirror/lang-json';
import { lintGutter, linter } from '@codemirror/lint';
import { type JSX } from 'react';

import { CodeEditor } from '@/components/code-editor';
import { useAppDispatch } from '@/store/store';
import type { ClientAction } from '@/types/client';

type Props = {
  variables: string;
  setVariables: ClientAction;
};

export function FormVariables({ variables, setVariables }: Props): JSX.Element {
  const dispatch = useAppDispatch();
  const handleVariablesChange = (value: string): void => {
    dispatch(setVariables(value));
  };
  return (
    <CodeEditor
      value={variables}
      onChange={handleVariablesChange}
      addExtensions={[linter(jsonParseLinter()), lintGutter()]}
    />
  );
}
