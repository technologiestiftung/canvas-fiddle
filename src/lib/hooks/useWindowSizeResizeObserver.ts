import { RefObject, useEffect, useRef, useState } from "react";

export const useWindowSizeResizeObserver = (
  elementToObserve: RefObject<HTMLElement>
) => {
  const observerRef = useRef<ResizeObserver | null>(null);
  const [elementWidth, setElementWidth] = useState(
    elementToObserve.current?.getBoundingClientRect().width || 0
  );
  const [elementHeight, setElementHeight] = useState(
    elementToObserve.current?.getBoundingClientRect().height || 0
  );

  useEffect(() => {
    observerRef.current = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;

      setElementWidth(entry.contentRect.width);
      setElementHeight(entry.contentRect.height);
    });

    if (elementToObserve.current) {
      observerRef.current.observe(elementToObserve.current);
    }
    return () => observerRef.current?.disconnect();
  }, []);

  return {
    width: elementWidth,
    height: elementHeight,
  };
};
