import { base64 } from './base64';

type ParsedObject = object | Record<string, string>;

export const parseBase64Object = (encodedStr: string): ParsedObject => {
  if (!encodedStr) return {};
  try {
    const decodedStr = base64.decode(encodedStr);
    return JSON.parse(decodedStr);
  } catch (error) {
    return {};
  }
};
