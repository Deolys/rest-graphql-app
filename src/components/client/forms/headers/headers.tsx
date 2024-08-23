import { Table } from 'antd';
import { type JSX } from 'react';

export function FormHeaders(t: Record<string, string>): JSX.Element {
  const dataSource = [
    {
      key: '1',
      paramsKey: 'Content-Type',
      value: 'application/json',
    },
  ];

  const columns = [
    {
      title: t.key,
      dataIndex: 'paramsKey',
      key: 'paramsKey',
    },
    {
      title: t.value,
      dataIndex: 'value',
      key: 'value',
    },
  ];
  return <Table dataSource={dataSource} columns={columns} size="small" />;
}
