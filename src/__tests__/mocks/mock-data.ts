import {
  GraphQLEnumType,
  GraphQLFloat,
  GraphQLInputObjectType,
  GraphQLNonNull,
} from 'graphql';

export const mockDocumentation = {
  name: 'Mock documentation',
  description: 'Mock description',
  getTypeMap: () => {
    return [GeoPoint, RGBType];
  },
};

const GeoPoint = new GraphQLInputObjectType({
  name: 'GeoPoint',
  fields: {
    lat: { type: new GraphQLNonNull(GraphQLFloat) },
    lon: { type: new GraphQLNonNull(GraphQLFloat) },
    alt: { type: GraphQLFloat, defaultValue: 0 },
  },
});

const RGBType = new GraphQLEnumType({
  name: 'RGB',
  values: {
    RED: { value: 0 },
    GREEN: { value: 1 },
    BLUE: { value: 2 },
  },
});

export const mockGraphResponse = {
  data: {
    graph: 'test-graph-response-data',
    colors: { red: 'red', yellow: 'yellow', blue: 'blue' },
  },
};

export const mockGraphErrorResponse = {
  errors: [
    {
      message: 'test-graph-error-response-message',
      locations: [
        {
          line: 1,
          column: 1,
        },
      ],
      path: ['graph'],
    },
  ],
};

export const mockRESTResponse = {
  data: {
    graph: 'test-rest-response-data',
    fruits: { apple: 'apple', avocado: 'avocado' },
  },
};

export const mockRESTResponseError = {
  errors: [
    {
      message: 'test-rest-error-response-message',
    },
  ],
};
