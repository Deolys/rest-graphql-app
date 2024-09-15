'use client';

import { Input } from 'antd';
import { type ChangeEvent, type JSX } from 'react';

import { useDebounce } from '@/hooks/use-debounce';
import { useAppDispatch } from '@/store';
import type { ClientAction } from '@/types/client';

type Props = {
  url: string;
  setURL: ClientAction;
  placeholder: string;
};

export function InputUrl({ url, setURL, placeholder }: Props): JSX.Element {
  const dispatch = useAppDispatch();
  const debaunceUpdate = useDebounce(
    (value: string) => dispatch(setURL(value)),
    1,
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    debaunceUpdate(e.target.value);
  };

  return (
    <Input
      value={url}
      onChange={handleChange}
      placeholder={placeholder}
      name="input-url"
    />
  );
}
