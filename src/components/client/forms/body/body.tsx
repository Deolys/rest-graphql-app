import { Table } from 'antd'

const dataSource = [
  {
    key: '1',
    paramsKey: 'name',
    value: 'my name',
  },
]

const columns = [
  {
    title: 'Key',
    dataIndex: 'paramsKey',
    key: 'paramsKey',
  },
  {
    title: 'Value',
    dataIndex: 'value',
    key: 'value',
  },
]

export function FormBody() {
  return <Table dataSource={dataSource} columns={columns} size="small" />
}
