import { Table } from 'antd';
import { type JSX } from 'react';

export function FormParams(t: Record<string, string>): JSX.Element {
  const dataSource = [
    {
      key: '1',
      paramsKey: 'name',
      value: 'My first name',
    },
    {
      key: '2',
      paramsKey: 'sort',
      value: 'desc',
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
