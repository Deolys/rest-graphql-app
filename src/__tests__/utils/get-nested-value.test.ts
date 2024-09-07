import type { GraphQLNamedType } from 'graphql';
import { GraphQLList, GraphQLObjectType } from 'graphql';
import { assert, describe, test } from 'vitest';

import { findField, getNestedType } from '@/utils/get-nested-value';

type QueryObjects = {
  obj: object;
  fieldName: string;
  expected: unknown;
};

const queryObjects: QueryObjects[] = [
  {
    obj: {},
    fieldName: '',
    expected: null,
  },
  {
    obj: { key: 'value' },
    fieldName: 'keys',
    expected: null,
  },
  {
    obj: { test: 'test value' },
    fieldName: 'test',
    expected: 'test value',
  },
  {
    obj: { test: ['val1', 'val2'] },
    fieldName: 'test',
    expected: ['val1', 'val2'],
  },
  {
    obj: {
      test: {
        lvl1: {
          key: 'value',
          lv2: {
            lvl3: 'target',
          },
        },
      },
    },
    fieldName: 'lvl3',
    expected: 'target',
  },
];

type QueryGraphQLList = {
  value: GraphQLNamedType;
  expected: unknown;
};

type Fields = {
  parents: {
    type: GraphQLList<GraphQLObjectType>;
  };
  children: {
    type: GraphQLList<GraphQLObjectType>;
  };
};

const PersonType = new GraphQLObjectType({
  name: 'Person',
  fields: (): Fields => ({
    parents: { type: new GraphQLList(PersonType) },
    children: { type: new GraphQLList(PersonType) },
  }),
});

const queryGraphQL: QueryGraphQLList[] = [
  {
    value: PersonType.getFields().parents.type as unknown as GraphQLNamedType,
    expected: 'Person',
  },
];

function msg(expected: unknown, result: unknown): string {
  const exp = JSON.stringify(expected);
  const res = JSON.stringify(result);
  return `\nexpected  : ${exp}\nreceived  : ${res}`;
}

describe('get-nested-value', () => {
  test('findField must return correct value from object', () => {
    queryObjects.forEach(({ obj, fieldName, expected }) => {
      const result = findField(obj, fieldName);
      assert(
        JSON.stringify(result) === JSON.stringify(expected),
        msg(expected, result),
      );
    });
  });
  test('getNestedType must return correct value', () => {
    queryGraphQL.forEach(({ value, expected }) => {
      const result = getNestedType(value);
      assert(
        JSON.stringify(result) === JSON.stringify(expected),
        msg(expected, result),
      );
    });
  });
});
