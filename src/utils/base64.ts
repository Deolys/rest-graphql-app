export const base64 = {
  encode: (str: string): string => (str ? btoa(str) : ''),
  decode: (str64: string): string => (str64 ? atob(str64) : ''),
}
