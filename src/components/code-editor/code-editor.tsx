import { json } from '@codemirror/lang-json';
import CodeMirror, { type ReactCodeMirrorProps } from '@uiw/react-codemirror';
import type { JSX } from 'react';

export function CodeEditor({ ...props }: ReactCodeMirrorProps): JSX.Element {
  return <CodeMirror height="300px" extensions={[json()]} {...props} />;
}
