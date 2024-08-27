'use client';

import { Input } from 'antd';
import { type ChangeEvent, type JSX, useContext } from 'react';

import { LanguageContext } from '@/providers/language';
import { useAppDispatch } from '@/store/store';
import type { ClientAction } from '@/types/client';

type Props = {
  url: string;
  setURL: ClientAction;
};

export function InputUrl({ url, setURL }: Props): JSX.Element {
  const dispatch = useAppDispatch();
  const { t } = useContext(LanguageContext);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    dispatch(setURL(e.target.value));
  };

  return (
    <Input value={url} onChange={handleChange} placeholder={t.enterURL}></Input>
  );
}
