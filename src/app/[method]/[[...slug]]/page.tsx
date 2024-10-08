'use server';

import { notFound } from 'next/navigation';
import { type ReactNode } from 'react';

import RestPage from '@/_pages/rest-page/page';
import { methods } from '@/constants/client';
import type { TRequestMethods } from '@/types/client';

interface PageProps {
  params: { method: TRequestMethods };
}

export default async function Page({
  params: { method },
}: PageProps): Promise<ReactNode> {
  if (!Object.values(methods).includes(method)) {
    return notFound();
  }

  return <RestPage />;
}
