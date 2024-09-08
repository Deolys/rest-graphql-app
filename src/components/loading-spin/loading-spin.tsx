import { Flex, Spin } from 'antd';
import type { JSX } from 'react';

export function LoadingSpin(): JSX.Element {
  return (
    <Flex justify="center" align="center" style={{ height: '40vh' }}>
      <Spin size="large" />
    </Flex>
  );
}
