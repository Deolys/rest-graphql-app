import { usePathname, useRouter } from 'next/navigation';

import { URLSegment } from '@/constants/client';
import { base64 } from '@/utils/base64';

type PathUrl = [result: string, (str: string) => void];

export function useURL(): PathUrl {
  const pathname = usePathname();
  const router = useRouter();
  const paths = pathname.split('/');
  const path = paths[URLSegment.url] || '';

  function setUrl(str: string): void {
    const pathBefore = pathname.split('/');
    pathBefore[URLSegment.url] = base64.encode(str);
    const pathAfter = pathBefore.join('/');
    router.push(pathAfter);
  }

  return [base64.decode(path), setUrl];
}
