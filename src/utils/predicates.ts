import { DataType } from '@/types/client';

type Props = unknown | DataType[];

const DataTypeKeys = ['key', 'keyName', 'keyValue'];

export function isDataTypeArr(data: Props): data is DataType[] {
  if (!Array.isArray(data)) return false;

  return DataTypeKeys.every((key) =>
    (data as DataType[]).every((el) => key in el),
  );
}
