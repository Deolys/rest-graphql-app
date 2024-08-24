import { usePathname, useRouter } from 'next/navigation';

import { methods } from '@/constants/client';
import type { TRequestMethods } from '@/types/client';

const indexMethod = 2;

type PathMethod = [result: string, (str: TRequestMethods) => void];

export function useMethods(): PathMethod {
  const pathname = usePathname();
  const router = useRouter();
  const method = pathname.split('/')[indexMethod] || methods.get;

  function setMethod(str: TRequestMethods): void {
    const pathBefore = pathname.split('/');
    pathBefore[indexMethod] = Object.values(methods).includes(str)
      ? str
      : methods.get;
    const pathAfter = pathBefore.join('/');
    router.push(pathAfter);
  }

  return [method.toUpperCase(), setMethod];
}
