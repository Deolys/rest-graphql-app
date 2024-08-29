'use client';

import { Empty } from 'antd';
import Sider from 'antd/es/layout/Sider';
import Title from 'antd/es/typography/Title';
import type { IntrospectionQuery } from 'graphql';
import { buildClientSchema, getIntrospectionQuery } from 'graphql';
import { type ReactNode, useEffect, useState } from 'react';

import { DocTypeList } from './doc-type-list';

type graphQLIntroResponse = {
  data: IntrospectionQuery;
};

export function Documentation(): ReactNode {
  const [schemas, setSchemas] = useState({});
  const [isCollapsed, setIsCollapsed] = useState(true);
  useEffect(() => {
    const fetchSchema = async (): Promise<void> => {
      try {
        const response = await fetch('https://rickandmortyapi.com/graphql', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query: getIntrospectionQuery() }),
        });

        const data = (await response.json()) as graphQLIntroResponse;
        const schema = buildClientSchema(data.data);

        const schemasData = schema.getTypeMap();
        setSchemas(schemasData);
      } catch (error) {
        console.error('Error while getting schemas:', error);
      }
    };

    fetchSchema();
  }, []);

  if (Object.keys(schemas).length === 0) {
    return null;
  }

  return (
    <Sider
      width={420}
      collapsedWidth={0}
      theme="light"
      collapsible
      collapsed={isCollapsed}
      onCollapse={(value) => setIsCollapsed(value)}
      zeroWidthTriggerStyle={{ backgroundColor: '#badaff' }}
    >
      <div style={{ overflowY: 'scroll', maxHeight: '100vh', padding: '10px' }}>
        {!isCollapsed && (
          <>
            <Title level={3}>Доступные схемы GraphQL</Title>
            {schemas ? <DocTypeList schemas={schemas} /> : <Empty />}
          </>
        )}
      </div>
    </Sider>
  );
}

export default Documentation;
