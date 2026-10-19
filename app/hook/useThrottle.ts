
import { useEffect, useRef } from "react";

export function useThrottle<T extends (...args: any[]) => void>(
  callback: T,
  delay: number
) {
  const lastRun = useRef(0);
  const timerId = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timerId.current) {
        clearTimeout(timerId.current)
      }
    }
  }, [])


  return (...args: Parameters<T>) => {
    const now = Date.now()
    const timeLeft = delay - (now - lastRun.current)

    if (timeLeft <= 0) {
      lastRun.current = now
      callback(...args)
      return
    }

    if (timerId.current) {
      clearTimeout(timerId.current)
    }

    timerId.current = setTimeout(() => {
      lastRun.current = Date.now()
      callback(...args)
    }, timeLeft)

  };
}
