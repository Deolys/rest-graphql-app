import { HttpResponse, http } from 'msw';

import en from '@public/locale/en.json';

import { mockDocumentation } from './mock-data';

export const handlers = [
  http.get('/locale/en.json', () => HttpResponse.json(en)),
  http.post('https://correct-sdl-url', () =>
    HttpResponse.json(mockDocumentation),
  ),
];
