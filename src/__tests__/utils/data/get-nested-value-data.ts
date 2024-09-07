import type { GraphQLNamedType } from 'graphql';
import { GraphQLList, GraphQLObjectType } from 'graphql';

type QueryObjects = {
  obj: object;
  fieldName: string;
  expected: unknown;
};

export const queryObjects: QueryObjects[] = [
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

export const PersonType = new GraphQLObjectType({
  name: 'Person',
  fields: (): Fields => ({
    parents: { type: new GraphQLList(PersonType) },
    children: { type: new GraphQLList(PersonType) },
  }),
});

export const queryGraphQL: QueryGraphQLList[] = [
  {
    value: PersonType.getFields().parents.type as unknown as GraphQLNamedType,
    expected: 'Person',
  },
];
