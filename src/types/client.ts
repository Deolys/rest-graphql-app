import type { methods } from '@/constants/client';

export interface DataType {
  key: React.Key;
  keyName: string;
  keyValue: string;
}

export type MethodsValues = keyof typeof methods;
