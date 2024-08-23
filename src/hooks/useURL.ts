import { usePathname, useRouter } from 'next/navigation';

import { URLSegment, initialParams } from '@/constants/client';
import type { DataType } from '@/types/client';
import { base64 } from '@/utils/base64';
import { isDataTypeArr } from '@/utils/predicates';

type SetURLProps = {
  newURL?: string;
  newParams?: DataType[];
};
type UseURL = {
  url: string;
  params: DataType[];
  setUrl: ({ newURL, newParams }: SetURLProps) => void;
};

export function useURL(): UseURL {
  const pathname = usePathname();
  const router = useRouter();
  let params = [initialParams];

  const paths = pathname
    .split('/')
    .slice(URLSegment.method)
    .map((pathEncoded) => base64.decode(pathEncoded));

  const [paramsSegment] = paths.filter(isDataType);
  const url = paths.filter((path) => !isDataType(path))[0];

  if (paramsSegment) {
    try {
      params = JSON.parse(paramsSegment);
    } catch (error) {
      throw new Error('Params parse error');
    }
  }

  function setUrl({ newURL, newParams }: SetURLProps): void {
    const paths = pathname.split('/').slice(0, URLSegment.method);

    if (newURL) {
      paths.push(base64.encode(newURL));
    } else {
      paths.push(base64.encode(url));
    }

    if (newParams) {
      paths.push(base64.encode(JSON.stringify(newParams)));
    } else if (paramsSegment) {
      paths.push(base64.encode(paramsSegment));
    }
    const pathAfter = paths.join('/');
    // FIX роутер перенести в обработчик кнопки Send
    // здесь он мешает
    router.push(pathAfter);
  }

  return { url, params, setUrl };
}

function isDataType(value: string): boolean {
  let data;
  try {
    data = JSON.parse(value);
  } catch (error) {
    return false;
  }

  return isDataTypeArr(data);
}
