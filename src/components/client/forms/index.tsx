import dynamic from 'next/dynamic';

import type CustomForm from './CustomForm/custom-form';

// Для чего тут динамический импорт? - Чтобы отключить SSR для компоненты.
// 'use client' не помогал и компонента рендерилась на сервере с ошибкой, т.к.
// в ней используются клиентские хуки.
export const ClientCustomForm = dynamic(
  () => import('./CustomForm/custom-form').then((form) => form),
  {
    loading: () => <p>Loading...</p>,
    ssr: false,
  },
) as typeof CustomForm;
