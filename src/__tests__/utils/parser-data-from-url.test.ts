import { assert, describe, test } from 'vitest';

import { parseDataFromURL } from '@/utils/parser-data-from-url';

import { encodedURLrestData } from './data/parser-data-from-url-data';
import { msg } from './msg';

describe('parseDataFromURL', () => {
  test('must return correct HTTP meathod', () => {
    encodedURLrestData.forEach(({ pathname, searchParams, expected }) => {
      const res = parseDataFromURL(pathname, searchParams);
      assert(res.method === expected.method, msg(expected.method, res.method));
    });
  });
  test('must return correct url', () => {
    encodedURLrestData.forEach(({ pathname, searchParams, expected }) => {
      const res = parseDataFromURL(pathname, searchParams);
      assert(res.url === expected.url, msg(expected.url, res.url));
    });
  });
  test('must return correct urlSDL', () => {
    encodedURLrestData.forEach(({ pathname, searchParams, expected }) => {
      const res = parseDataFromURL(pathname, searchParams);
      assert(res.urlSDL === expected.urlSDL, msg(expected.urlSDL, res.urlSDL));
    });
  });
  test('must return correct variables', () => {
    encodedURLrestData.forEach(({ pathname, searchParams, expected }) => {
      const res = parseDataFromURL(pathname, searchParams);
      assert(
        JSON.stringify(res.variables) === JSON.stringify(expected.variables),
        msg(expected.variables, res.variables),
      );
    });
  });
  test('must return correct body', () => {
    encodedURLrestData.forEach(({ pathname, searchParams, expected }) => {
      const res = parseDataFromURL(pathname, searchParams);
      assert(res.body === expected.body, msg(expected.body, res.body));
    });
  });
  test('must return correct headers', () => {
    encodedURLrestData.forEach(({ pathname, searchParams, expected }) => {
      const res = parseDataFromURL(pathname, searchParams);
      assert(
        JSON.stringify(res.headers) === JSON.stringify(expected.headers),
        msg(expected.headers, res.headers),
      );
    });
  });
});
