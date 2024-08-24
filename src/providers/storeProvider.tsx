'use client';

import { useRef } from 'react';
import { Provider } from 'react-redux';

import type { AppStore } from '@/store/store';
import { setupStore } from '@/store/store';

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) storeRef.current = setupStore();

  return <Provider store={storeRef.current}>{children}</Provider>;
}
