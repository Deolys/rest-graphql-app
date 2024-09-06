import { vi } from 'vitest';

import ru from '../../../public/locale/ru.json';

export const mockLanguageContext = {
  t: ru,
  toggleLanguage: vi.fn(),
};
