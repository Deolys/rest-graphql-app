'use client';

import Sider from 'antd/es/layout/Sider';
import type { GraphQLNamedType, IntrospectionQuery } from 'graphql';
import {
  GraphQLEnumType,
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLObjectType,
  buildClientSchema,
  getIntrospectionQuery,
} from 'graphql';
import { type JSX, type ReactNode, useEffect, useState } from 'react';

type graphQLIntroResponse = {
  data: IntrospectionQuery;
};

function findField<T>(obj: T, fieldName: string): T[keyof T] | null {
  for (const key in obj) {
    if (key === fieldName) {
      return obj[key];
    } else if (typeof obj[key] === 'object') {
      const result = findField(obj[key] as T, fieldName);
      if (result) {
        return result;
      }
    }
  }
  return null;
}

function getNestedType(value: GraphQLNamedType): GraphQLNamedType | null {
  if (value instanceof GraphQLList) {
    return value.ofType?.ofType || value.ofType || null;
  }
  return null;
}

interface DocItemTypes {
  value: GraphQLNamedType | null;
}

function DocItemTypes({ value }: DocItemTypes): ReactNode {
  if (!value) {
    return null;
  }

  return (
    <ul>
      {((value instanceof GraphQLObjectType ||
        value instanceof GraphQLInputObjectType) &&
        Object.entries(value.getFields()).map((field) => {
          const description = findField(field[1].type, 'description');
          return (
            <li key={field[0]}>
              {`${field[0]}: ${findField(field[1].type, 'name')}`}
              {description ? (
                <p>{`Description: ${description}`}</p>
              ) : (
                <DocItemTypes value={field[1].type} />
              )}
            </li>
          );
        })) ||
        (value instanceof GraphQLEnumType &&
          value
            .getValues()
            .map((value, index) => (
              <li key={value.name + index}>
                {`${value.name}: ${value.description}`}
              </li>
            ))) ||
        (value instanceof GraphQLList && (
          <DocItemTypes value={getNestedType(value)} />
        ))}
    </ul>
  );
}

interface DocTypeListProps {
  schemas: { [key: string]: GraphQLNamedType };
}

function DocTypeList({ schemas }: DocTypeListProps): JSX.Element {
  return (
    <ul>
      {Object.entries(schemas).map(([key, value]) => {
        return (
          <li key={key + value}>
            <h2>{key}</h2>
            <DocItemTypes value={value} />
          </li>
        );
      })}
    </ul>
  );
}

function Documentation(): JSX.Element {
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
