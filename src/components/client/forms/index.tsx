import dynamic from 'next/dynamic';

import type CustomForm from './custom-form/custom-form';

export const ClientCustomForm = dynamic(
  () => import('./custom-form/custom-form').then((form) => form),
  {
    loading: () => <p>Loading...</p>,
    ssr: false,
  },
) as typeof CustomForm;
