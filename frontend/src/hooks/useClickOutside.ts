import { useEffect, useRef } from "react";

export default function useClickOutside(callbackFn: () => void) {
  const domNodeRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handler = (event: MouseEvent) => {
      if (
        domNodeRef.current &&
        !domNodeRef.current.contains(event.target as Node)
      ) {
        callbackFn();
      }
    };

    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, [callbackFn]);

  return domNodeRef;
}
