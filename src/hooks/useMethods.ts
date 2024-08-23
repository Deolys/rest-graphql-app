import { methods } from '@/constants/client';
import { usePathname, useRouter } from 'next/navigation';

const indexMethod = 2;

type PathMethod = [result: string, (str: string) => void];

export function useMethods(): PathMethod {
  const pathname = usePathname();
  const router = useRouter();
  const method = pathname.split('/')[indexMethod] || methods.get;

  function setMethod(str: string): void {
    const pathBefore = pathname.split('/');
    pathBefore[indexMethod] = Object.values(methods).includes(str)
      ? str
      : methods.get;
    const pathAfter = pathBefore.join('/');
    router.push(pathAfter);
  }

  return [method.toUpperCase(), setMethod];
}
