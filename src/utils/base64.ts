export const base64 = {
  encode: (str: string): string => (str ? btoa(encodeURIComponent(str)) : ''),
  decode: (str64: string): string => {
    if (!str64) return '';
    let result = '';
    try {
      result = decodeURIComponent(atob(str64));
    } catch (error) {
      console.warn('base64', error);
    }

    return result;
  },
};
