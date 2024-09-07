import dynamic from 'next/dynamic';

import type CustomForm from './CustomForm/custom-form';

export const ClientCustomForm = dynamic(
  () => import('./CustomForm/custom-form').then((form) => form),
  {
    loading: () => <p>Loading...</p>,
    ssr: false,
  },
) as typeof CustomForm;
