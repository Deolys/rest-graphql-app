import { usePathname } from 'next/navigation';

import { base64 } from '../utils/base64';

type Props = {
  endpointURL: string;
  headers: HeadersInit;
  query: string;
  variables: string;
};

type EncodeURLgraphql = ({
  endpointURL,
  headers,
  query,
  variables,
}: Props) => string;

export function useEncodeURLgraphql(): EncodeURLgraphql {
  const pathName = usePathname();
  const [, baseSegment] = pathName.split('/');

  function encodeURL({
    endpointURL = '',
    query = '',
    variables = '',
    headers,
  }: Props): string {
    const urlObj = JSON.stringify({ endpointURL });
    const urlBase64 = '/' + base64.encode(urlObj);

    const varsQueryObj = JSON.stringify({ variables, query });
    const varsQueryBase64 = '/' + base64.encode(varsQueryObj);

    let headersBase64 = '';
    const headersArr = Object.entries(headers);
    if (headersArr.length) {
      const tempURL = new URL('http://temp.com');
      headersArr.forEach(([key, value]) => {
        if (key && value) tempURL.searchParams.append(key, value);
      });
      headersBase64 = tempURL.searchParams.size
        ? '?' + tempURL.searchParams.toString()
        : '';
    }

    return `/${baseSegment}${urlBase64}${varsQueryBase64}${headersBase64}`;
  }

  return encodeURL;
}
