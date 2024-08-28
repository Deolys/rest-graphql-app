import { usePathname } from 'next/navigation';

import { base64 } from '../utils/base64';

type Props = {
  endpointURL: string;
  sdlURL: string;
  headers: HeadersInit;
  query: string;
  variables: string;
};

type EncodeURLgraphql = ({
  endpointURL,
  sdlURL,
  headers,
  query,
  variables,
}: Props) => string;

export function useEncodeURLgraphql(): EncodeURLgraphql {
  const pathName = usePathname();
  const [, baseSegment] = pathName.split('/');

  function encodeURL({
    endpointURL = '',
    sdlURL = '',
    query = '',
    variables = '',
    headers,
  }: Props): string {
    let urlBase64 = '';
    const urlObj = JSON.stringify({ endpointURL, sdlURL });
    urlBase64 = '/' + base64.encode(urlObj);

    let varsQueryBase64 = '';
    const varsQueryObj = JSON.stringify({ variables, query });
    varsQueryBase64 = '/' + base64.encode(varsQueryObj);

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
