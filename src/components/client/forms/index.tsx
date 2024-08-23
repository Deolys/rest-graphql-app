import dynamic from 'next/dynamic';
export { FormBody } from './body/body';
import FormParams from './params/params';
export { FormHeaders } from './headers/headers';

// Для чего тут динамический импорт? - Чтобы отключить SSR для компоненты.
// 'use client' не помогал и компонента рендерилась на сервере с ошибкой, т.к.
// в ней используются клиентские хуки.
export const Params = dynamic(
  () => import('./params/params').then((form) => form),
  {
    loading: () => <p>Loading...</p>,
    ssr: false,
  },
) as typeof FormParams;
