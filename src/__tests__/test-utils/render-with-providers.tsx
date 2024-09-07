import type { RenderOptions } from '@testing-library/react';
import { render } from '@testing-library/react';
import type { ReactElement } from 'react';

import Providers from '@/providers/providers';
import type { AppStore, RootState } from '@/store/store';
import { setupStore } from '@/store/store';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: Partial<RootState>;
  store?: AppStore;
}

interface RenderWithProviders {
  container: HTMLElement;
  store: AppStore;
}

export const renderWithProviders = (
  ui: ReactElement,
  extendedRenderOptions: ExtendedRenderOptions = {},
): RenderWithProviders => {
  const { store = setupStore(), ...renderOptions } = extendedRenderOptions;

  const Wrapper = (): JSX.Element => {
    return <Providers>{ui}</Providers>;
  };

  return {
    store,
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  };
};
