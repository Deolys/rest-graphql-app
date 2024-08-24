import { type JSX } from 'react';

import { CodeEditor } from '@/components/code-editor';
import { setBody } from '@/store/reducers/requestSlice';
import { useAppDispatch, useAppSelector } from '@/store/store';

export function FormBody(): JSX.Element {
  const dispatch = useAppDispatch();
  const body = useAppSelector((state) => state.request.body);
  const handleBodyChange = (value: string): void => {
    dispatch(setBody(value));
  };
  return <CodeEditor value={body} onChange={handleBodyChange} />;
}
