import { Spin } from 'antd';
import dynamic from 'next/dynamic';

import type CustomForm from './custom-form/custom-form';

export const ClientCustomForm = dynamic(
  () => import('./custom-form/custom-form').then((form) => form),
  {
    loading: () => <Spin />,
    ssr: false,
  },
) as typeof CustomForm;
