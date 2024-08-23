'use client';

import { Table } from 'antd';
import type { TableProps } from 'antd';
import { type JSX } from 'react';

interface DataType {
  key: string;
  date: string;
  request: string;
  status: string;
}

const columns: TableProps<DataType>['columns'] = [
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: 'Request',
    dataIndex: 'request',
    key: 'request',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
  },
];

const data: DataType[] = [
  {
    key: '1',
    date: 'Yesterday',
    request: 'google.com',
    status: '200',
  },
  {
    key: '2',
    date: 'Today',
    request: 'x.com',
    status: '403',
  },
];

export default function HistoryPage(): JSX.Element {
  return (
    <>
      <article style={{ padding: '1em' }}>
        <h1 style={{ textAlign: 'center' }}>History</h1>;
        <Table columns={columns} dataSource={data} />
      </article>
    </>
  );
}
