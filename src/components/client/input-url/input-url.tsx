'use client';

import {
  type JSX,
  type ChangeEvent,
  useEffect,
  useState,
  useContext,
} from 'react';
import { usePathname } from 'next/navigation';
import { Input } from 'antd';
import { useURL } from '@/hooks/useURL';
import { LanguageContext } from '@/providers/language';

export function InputUrl(): JSX.Element {
  const pathname = usePathname();
  const { url, setUrl } = useURL();
  const [input, setInput] = useState(url);
  const { t } = useContext(LanguageContext);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void =>
    setInput(e.target.value);
  const handleBlur = (): void => setUrl({ newURL: input });
  useEffect(() => setInput(url), [pathname, url]);

  return (
    <Input
      value={input}
      onBlur={handleBlur}
      onChange={handleChange}
      placeholder={t.enterURL}
    ></Input>
  );
}
