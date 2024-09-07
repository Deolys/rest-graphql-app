import { HttpResponse, http } from 'msw';

import en from '@public/locale/en.json';

import {
  mockDocumentation,
  mockGraphErrorResponse,
  mockGraphResponse,
  mockRESTResponse,
  mockRESTResponseError,
} from './mock-data';

export const handlers = [
  http.get('/locale/en.json', () => HttpResponse.json(en)),
  http.post('https://correct-api-url/', ({ request }) => {
    const url = new URL(request.url);
    const sdlParam = url.searchParams.get('sdl');

    if (!sdlParam) {
      return HttpResponse.json(mockGraphResponse);
    }

    return HttpResponse.json(mockDocumentation);
  }),
  http.post('https://incorrect-api-url/', ({ request }) => {
    const url = new URL(request.url);
    const sdlParam = url.searchParams.get('sdl');

    if (!sdlParam) {
      return HttpResponse.json(mockGraphErrorResponse, { status: 400 });
    }

    return HttpResponse.json(mockGraphErrorResponse, { status: 400 });
  }),
  http.all('https://correct-rest-api-url/', () =>
    HttpResponse.json(mockRESTResponse),
  ),
  http.get('https://incorrect-rest-api-url/', () =>
    HttpResponse.json(mockRESTResponseError, { status: 400 }),
  ),
];
