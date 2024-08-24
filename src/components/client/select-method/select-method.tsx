'use client';

import { Select } from 'antd';
import { type JSX, useEffect, useState } from 'react';

import { methods } from '@/constants/client';
import { useMethods } from '@/hooks/useMethods';
import type { TRequestMethods } from '@/types/client';

export function SelectMethod(): JSX.Element {
  const [method, setMethod] = useMethods();
  const [input, setInput] = useState<TRequestMethods>(
    method as TRequestMethods,
  );

  const handleChange = (method: TRequestMethods): void => setInput(method);
  useEffect(() => setMethod(input), [input, setMethod]);

  return (
    <Select
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
      value={input}
    ></Select>
  );
}
