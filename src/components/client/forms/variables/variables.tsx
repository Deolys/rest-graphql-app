import { type JSX } from 'react';

import { CodeEditor } from '@/components/code-editor';
import { setVariables } from '@/store/reducers/requestSlice';
import { useAppDispatch, useAppSelector } from '@/store/store';

export function FormVariables(): JSX.Element {
  const dispatch = useAppDispatch();
  const variables = useAppSelector((state) => state.request.variables);
  const handleVariablesChange = (value: string): void => {
    dispatch(setVariables(value));
  };
  return <CodeEditor value={variables} onChange={handleVariablesChange} />;
}
