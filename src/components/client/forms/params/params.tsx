import { Table } from 'antd'

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
export function FormParams() {
  return <Table dataSource={dataSource} columns={columns} size="small" />
}
