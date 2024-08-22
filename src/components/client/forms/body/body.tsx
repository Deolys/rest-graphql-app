import { Table } from 'antd';

export function FormBody(t: Record<string, string>): JSX.Element {
  const dataSource = [
    {
      key: '1',
      paramsKey: 'name',
      value: 'my name',
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
