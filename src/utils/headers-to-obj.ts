import type { DataType } from '@/types/client';

export function headersToObj(headers: DataType[]): HeadersInit {
  const mappedHeaders = headers.reduce<HeadersInit>(
    (obj, header) => ({ ...obj, [header.keyName]: header.keyValue }),
    {},
  );
  return mappedHeaders;
}
