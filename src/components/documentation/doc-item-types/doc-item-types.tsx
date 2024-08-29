import type { CollapseProps } from 'antd';
import { Collapse } from 'antd';
import {
  GraphQLEnumType,
  GraphQLInputObjectType,
  GraphQLList,
  type GraphQLNamedType,
  GraphQLObjectType,
} from 'graphql';
import type { ReactNode } from 'react';

import { findField, getNestedType } from '@/utils/get-nested-value';

interface DocItemTypes {
  value: GraphQLNamedType | null;
}

function generateUniqueKey(prefix = 'item'): () => string {
  let counter = 0;
  return () => `${prefix}-${counter++}`;
}

const uniqueKeyGenerator = generateUniqueKey();

export function DocItemTypes({ value }: DocItemTypes): ReactNode {
  if (!value) {
    return null;
  }

  return (
    <ul>
      {((value instanceof GraphQLObjectType ||
        value instanceof GraphQLInputObjectType) &&
        Object.entries(value.getFields()).map((field, index) => {
          const description = findField(field[1], 'description');
          const name = findField(field[1].type, 'name');
          const items: CollapseProps['items'] = [
            {
              key: index + field[0],
              label: `${field[0]}: ${name}`,
              children: (
                <>
                  <p style={{ marginBottom: 12 }}>{description}</p>
                  <DocItemTypes value={field[1].type} />
                </>
              ),
            },
          ];
          return (
            <Collapse
              style={{ minWidth: 200 }}
              key={uniqueKeyGenerator()}
              items={items}
            />
          );
        })) ||
        (value instanceof GraphQLEnumType &&
          value.getValues().map((value, index) => {
            const items = [
              {
                key: value.name + index,
                label: value.name,
                children: <p>{value.description}</p>,
              },
            ];
            return (
              <Collapse
                style={{ minWidth: 200 }}
                key={uniqueKeyGenerator()}
                items={items}
              />
            );
          })) ||
        (value instanceof GraphQLList && (
          <DocItemTypes value={getNestedType(value)} />
        ))}
    </ul>
  );
}
