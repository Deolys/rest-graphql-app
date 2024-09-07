'use client';

import { Select } from 'antd';
import { type JSX } from 'react';

import { methods } from '@/constants/client';
import { useAppDispatch, useAppSelector } from '@/store';
import { selectMethod, setMethod } from '@/store/reducers/rest-request-slice';
import type { HTTPMethod } from '@/types/client';

export function SelectMethod(): JSX.Element {
  const dispatch = useAppDispatch();
  const method = useAppSelector(selectMethod);

  const handleChange = (method: HTTPMethod): void => {
    dispatch(setMethod(method));
  };

  return (
    <Select
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
