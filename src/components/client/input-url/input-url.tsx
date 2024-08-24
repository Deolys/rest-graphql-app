'use client';

import { Input } from 'antd';
import { type ChangeEvent, type JSX, useContext } from 'react';

import { LanguageContext } from '@/providers/language';
import { useAppDispatch, useAppSelector } from '@/store/store';

import { selectURL, setUrl } from '../requestSlice';

export function InputUrl(): JSX.Element {
  const dispatch = useAppDispatch();
  const url = useAppSelector(selectURL);
  const { t } = useContext(LanguageContext);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    dispatch(setUrl(e.target.value));
  };

  return (
    <Input value={url} onChange={handleChange} placeholder={t.enterURL}></Input>
  );
}
