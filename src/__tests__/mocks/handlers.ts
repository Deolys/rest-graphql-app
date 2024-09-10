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
  http.all('/api/rest', ({ request }) => {
    const url = new URL(request.url);
    const urlParam = url.searchParams.get('url');

    if (!urlParam || urlParam === 'https://incorrect-rest-api-url/') {
      return HttpResponse.json(mockRESTResponseError, { status: 400 });
    }

    return HttpResponse.json(mockRESTResponse);
  }),
];
