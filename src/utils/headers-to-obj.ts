import type { DataType } from '@/types/client';

export function headersToObj(headers: DataType[]): HeadersInit {
  const filteredHeaders = headers.filter(noEmptyValues);
  const mappedHeaders = filteredHeaders.reduce<HeadersInit>(removeKey, {});
  return mappedHeaders;
}

function noEmptyValues(header: DataType): boolean {
  return Boolean(header.keyName) && Boolean(header.keyValue);
}

function removeKey(obj: HeadersInit, header: DataType): HeadersInit {
  return { ...obj, [header.keyName]: header.keyValue };
}
