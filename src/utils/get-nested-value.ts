import { GraphQLList, type GraphQLNamedType } from 'graphql';

export function findField<T>(obj: T, fieldName: string): T[keyof T] | null {
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

export function getNestedType(
  value: GraphQLNamedType,
): GraphQLNamedType | null {
  if (value instanceof GraphQLList) {
    return value.ofType?.ofType || value.ofType || null;
  }
  return null;
}
