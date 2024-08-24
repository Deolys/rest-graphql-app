'use client';

import { Select } from 'antd';
import { type JSX } from 'react';

import { methods } from '@/constants/client';
import { useAppDispatch, useAppSelector } from '@/store/store';
import type { HTTPMethod } from '@/types/client';

import { selectMethod, setMethod } from '../requestSlice';

export function SelectMethod(): JSX.Element {
  const dispatch = useAppDispatch();
  const method = useAppSelector(selectMethod);

  const handleChange = (method: string): void => {
    dispatch(setMethod(method as HTTPMethod));
  };

  return (
    <Select
      // FIX translate
      placeholder="Method..."
      style={{
        width: '10em',
      }}
      options={Object.values(methods).map((method) => {
        return {
          value: method,
          label: method,
        };
      })}
      onChange={handleChange}
      value={method}
    ></Select>
  );
}
