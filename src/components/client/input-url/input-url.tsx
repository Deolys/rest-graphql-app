'use client';

import { Input } from 'antd';
import { type ChangeEvent, type JSX } from 'react';

import { useAppDispatch } from '@/store/store';
import type { ClientAction } from '@/types/client';

type Props = {
  url: string;
  setURL: ClientAction;
  placeholder: string;
};

export function InputUrl({ url, setURL, placeholder }: Props): JSX.Element {
  const dispatch = useAppDispatch();

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    dispatch(setURL(e.target.value));
  };

  return (
    <Input
      value={url}
      onChange={handleChange}
      placeholder={placeholder}
    ></Input>
  );
}
