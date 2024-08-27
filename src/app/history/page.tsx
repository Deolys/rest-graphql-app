'use client';

import { List } from 'antd';
import Link from 'next/link';
import { useContext } from 'react';

import type { methods } from '@/constants/client';
import { withAuth } from '@/hoc/with-auth';
import { LanguageContext } from '@/providers/language';
import type { MethodsValues } from '@/types/client';

type Data = {
  date: string;
  method: (typeof methods)[MethodsValues];
  query: string;
};

const data: Data[] = [
  {
    date: '23-08-2024',
    method: 'GET',
    query:
      'https://github.com/rolling-scopes-school/tasks/blob/master/react/modules/tasks/final.md',
  },
  {
    date: '24-08-2024',
    method: 'POST',
    query: 'https://github.com/algoritmiks/graphiql-app/pulls',
  },
  {
    date: '25-08-2024',
    method: 'GRAPHQL',
    query: 'https://github.com/users/algoritmiks/projects/1/views/1',
  },
];

export function HistoryPage(): JSX.Element {
  const { t } = useContext(LanguageContext);

  return (
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
                <span style={{ paddingRight: '0.5em' }}>{item.date}:</span>
                <span style={{ paddingRight: '0.5em' }}>[{item.method}]</span>
                <Link href={item.query}>{item.query}</Link>
              </p>
            }
          </List.Item>
        )}
      />
    </article>
  );
}

export default withAuth(HistoryPage);
