export function useDebounce<T>(
  callback: (value: T) => void,
  delay: number,
): (value: T) => void {
  let timeout: NodeJS.Timeout | null = null;

  return (value: T) => {
    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => {
      callback(value);
    }, delay);
  };
}
