import { type JSX } from 'react';

import { LanguageProvider } from '@/providers/language';
import StoreProvider from '@/providers/store-provider';

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <StoreProvider>
      <LanguageProvider>{children}</LanguageProvider>
    </StoreProvider>
  );
}
