import type { methods } from '@/constants/client';

export interface DataType {
  key: React.Key;
  keyName: string;
  keyValue: string;
}

export type HTTPMethod = (typeof methods)[MethodsValues];

export type InitialState = {
  isFormInited: boolean;
  method: HTTPMethod;
  url: string;
  headers: DataType[];
  body: DataType[];
};

export type MethodsValues = keyof typeof methods;

export type TRequestMethods =
  | 'GET'
  | 'POST'
  | 'PUT'
  | 'PATCH'
  | 'DELETE'
  | 'HEAD'
  | 'OPTIONS'
  | 'GRAPHQL';
