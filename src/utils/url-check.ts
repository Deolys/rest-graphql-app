export function urlCheck(url: string): URL {
  return new URL(url.match(/(http:\/\/|https:\/\/)/i) ? url : 'https://' + url);
}
