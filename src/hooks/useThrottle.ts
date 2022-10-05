import { useState, useEffect, useCallback, useRef } from 'react';

type Callback<T> = (...args: T[]) => void;

export default function useThrottle<T>(
  callback: Callback<T>,
  timeout = 300,
): [Callback<T>, boolean] {
  const [ready, setReady] = useState(true);
  const timerRef = useRef<number | undefined>(undefined);

  const throttledFn = useCallback(
    (...args: T[]) => {
      if (!ready) {
        return;
      }

      setReady(false);
      callback(...args);
    },
    [ready, callback],
  );

  useEffect(() => {
    if (!ready) {
      timerRef.current = window.setTimeout(() => {
        setReady(true);
      }, timeout);

      return () => window.clearTimeout(timerRef.current);
    }

    return () => {};
  }, [ready, timeout]);

  return [throttledFn, ready];
}
