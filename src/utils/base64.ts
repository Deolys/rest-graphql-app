// BUG Cyrillic cause error in btoa()
export const base64 = {
  encode: (str: string): string => (str ? btoa(str) : ''),
  decode: (str64: string): string => {
    if (!str64) return '';
    let result = '';
    try {
      result = atob(str64);
    } catch (error) {
      return ''; // FIX catch error
    }

    return result;
  },
};
