'use client';

import { Input } from 'antd';
import { type ChangeEvent, type JSX, useEffect, useState } from 'react';

import { useDebounce } from '@/hooks/use-debounce';
import { useAppDispatch } from '@/store/store';
import type { ClientAction } from '@/types/client';

type Props = {
  url: string;
  setURL: ClientAction;
  placeholder: string;
};

export function InputUrl({ url, setURL, placeholder }: Props): JSX.Element {
  const dispatch = useAppDispatch();
  const [value, setValue] = useState(url);
  const debouncedValue = useDebounce(value, 500);

  useEffect(() => {
    dispatch(setURL(debouncedValue));
  }, [debouncedValue, dispatch, setURL]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setValue(e.target.value);
  };

  return (
    <Input
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
    ></Input>
  );
}
