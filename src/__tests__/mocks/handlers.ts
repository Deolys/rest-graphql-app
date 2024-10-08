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
  http.post('/api/graphql', ({ request }) => {
    const url = new URL(request.url);
    const urlParam = url.searchParams.get('url');
    if (!urlParam || urlParam.startsWith('https://incorrect-api-url/')) {
      return HttpResponse.json(mockGraphErrorResponse, { status: 400 });
    }

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
  http.all('https://test.com/', ({ request }) => {
    const url = new URL(request.url);
    const urlParam = url.searchParams.get('status');

    switch (urlParam) {
      case '200':
        return HttpResponse.json(mockRESTResponse);
      case '400':
        return HttpResponse.json(mockRESTResponseError, { status: 400 });

      default:
        return HttpResponse.json(mockRESTResponseError, { status: 500 });
    }
  }),
];
