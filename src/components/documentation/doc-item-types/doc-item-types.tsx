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

export function DocItemTypes({ value }: DocItemTypes): ReactNode {
  if (!value) {
    return null;
  }

  return (
    <ul>
      {((value instanceof GraphQLObjectType ||
        value instanceof GraphQLInputObjectType) &&
        Object.entries(value.getFields()).map((field) => {
          const description = findField(field[1].type, 'description');
          const name = findField(field[1].type, 'name');
          return (
            <li key={field[0] + name}>
              {`${field[0]}: ${name}`}
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
