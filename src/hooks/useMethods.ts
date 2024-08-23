import { usePathname, useRouter } from 'next/navigation';

import { URLSegment, methods } from '@/constants/client';

type PathMethod = [result: string, (str: string) => void];

export function useMethods(): PathMethod {
  const pathname = usePathname();
  const router = useRouter();
  const method = pathname.split('/')[URLSegment.method] || methods.get;

  function setMethod(str: string): void {
    const pathBefore = pathname.split('/');
    pathBefore[URLSegment.method] = Object.values(methods).includes(str)
      ? str
      : methods.get;
    const pathAfter = pathBefore.join('/');
    router.push(pathAfter);
  }

  return [method.toUpperCase(), setMethod];
}
