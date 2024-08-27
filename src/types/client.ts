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
  body: string;
  variables: string;
  responseStatus: string;
  responseBody: string;
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

export type ClientAction<T = string> = (payload: T) => {
  payload: T;
  type: string;
};

export type ClientTab = {
  label: string;
  key: string;
};
