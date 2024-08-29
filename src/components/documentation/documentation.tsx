'use client';

import Sider from 'antd/es/layout/Sider';
import type { IntrospectionQuery } from 'graphql';
import { buildClientSchema, getIntrospectionQuery } from 'graphql';
import { type JSX, useEffect, useState } from 'react';

import { DocTypeList } from './doc-type-list';

type graphQLIntroResponse = {
  data: IntrospectionQuery;
};

export function Documentation(): JSX.Element {
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

  return (
    <Sider
      width={400}
      style={{ zIndex: 1 }}
      collapsedWidth={0}
      theme="light"
      collapsible
      collapsed={isCollapsed}
      onCollapse={(value) => setIsCollapsed(value)}
      zeroWidthTriggerStyle={{}}
    >
      <div style={{ overflowY: 'scroll', maxHeight: '100vh' }}>
        {!isCollapsed && (
          <>
            <h1>Доступные схемы GraphQL</h1>
            <DocTypeList schemas={schemas} />
          </>
        )}
      </div>
    </Sider>
  );
}

export default Documentation;
