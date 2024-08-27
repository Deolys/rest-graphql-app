import { json } from '@codemirror/lang-json';
import CodeMirror, {
  type Extension,
  type ReactCodeMirrorProps,
} from '@uiw/react-codemirror';
import type { JSX } from 'react';

export function CodeEditor({
  addExtensions,
  ...props
}: ReactCodeMirrorProps & { addExtensions?: Extension[] }): JSX.Element {
  return (
    <CodeMirror
      height="300px"
      extensions={[json(), ...(addExtensions || [])]}
      {...props}
    />
  );
}
