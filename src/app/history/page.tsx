'use client';

import { List } from 'antd';
import Link from 'next/link';
import { useContext } from 'react';

import { LanguageContext } from '@/providers/language';

type Data = {
  date: string;
  query: string;
};

const data: Data[] = [
  {
    date: '23-08-2024',
    query:
      'https://github.com/rolling-scopes-school/tasks/blob/master/react/modules/tasks/final.md',
  },
  {
    date: '24-08-2024',
    query: 'https://github.com/algoritmiks/graphiql-app/pulls',
  },
  {
    date: '25-08-2024',
    query: 'https://github.com/users/algoritmiks/projects/1/views/1',
  },
];

export default function HistoryPage(): JSX.Element {
  const { t } = useContext(LanguageContext);

  return (
    <>
      <article style={{ padding: '1em' }}>
        <List
          size="large"
          header={<h1 style={{ textAlign: 'center' }}>{t.history}</h1>}
          bordered
          dataSource={data}
          renderItem={(item) => (
            <List.Item>
              {
                <p>
                  <span>{item.date}: </span>
                  <Link href={item.query}>{item.query}</Link>
                </p>
              }
            </List.Item>
          )}
        />
      </article>
    </>
  );
}
