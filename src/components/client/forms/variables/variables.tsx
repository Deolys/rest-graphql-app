import { jsonParseLinter } from '@codemirror/lang-json';
import { lintGutter, linter } from '@codemirror/lint';
import { type JSX, useEffect, useState } from 'react';

import { CodeEditor } from '@/components/code-editor';
import { useDebounce } from '@/hooks/use-debounce';
import { useAppDispatch } from '@/store/store';
import type { ClientAction } from '@/types/client';

type Props = {
  variables: string;
  setVariables: ClientAction;
};

export function FormVariables({ variables, setVariables }: Props): JSX.Element {
  const dispatch = useAppDispatch();
  const [value, setValue] = useState(variables);
  const debouncedValue = useDebounce(value, 500);

  useEffect(() => {
    dispatch(setVariables(debouncedValue));
  }, [debouncedValue, dispatch, setVariables]);

  const handleVariablesChange = (value: string): void => {
    setValue(value);
  };

  return (
    <CodeEditor
      value={value}
      onChange={handleVariablesChange}
      addExtensions={[linter(jsonParseLinter()), lintGutter()]}
    />
  );
}
