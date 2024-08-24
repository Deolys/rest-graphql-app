import { methods } from '@/constants/client';
import type { DataType, HTTPMethod } from '@/types/client';

const DataTypeKeys = ['key', 'keyName', 'keyValue'];

export function isDataTypeArr(data: unknown | DataType[]): data is DataType[] {
  if (!Array.isArray(data)) return false;

  return DataTypeKeys.every((key) =>
    (data as DataType[]).every((el) => key in el),
  );
}

export function isHTTPMethod(data: unknown | HTTPMethod): data is HTTPMethod {
  if (!data) return false;

  return Object.values(methods).includes(data as HTTPMethod);
}

export function isDataType(value: string): boolean {
  let data;
  try {
    data = JSON.parse(value);
  } catch (error) {
    return false;
  }

  return isDataTypeArr(data);
}
