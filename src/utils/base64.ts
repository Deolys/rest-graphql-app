export const base64 = {
  encode: (str: string): string => {
    const encodeURI = encodeURIComponent(str);
    const encoded64 = str ? btoa(encodeURI) : '';
    return encoded64;
  },
  decode: (str64: string): string => {
    if (!str64) return '';
    let result = '';
    try {
      result = decodeURIComponent(atob(str64));
    } catch (error) {
      return str64;
    }

    return result;
  },
};
