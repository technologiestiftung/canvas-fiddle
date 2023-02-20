import { RefObject, useEffect, useRef, useState } from "react";

export const useElementSizeByResizeObserver = (
  elementToObserveRef: RefObject<HTMLElement>
) => {
  const observerRef = useRef<ResizeObserver | null>(null);
  const [elementWidth, setElementWidth] = useState(
    elementToObserveRef.current?.getBoundingClientRect().width || 0
  );
  const [elementHeight, setElementHeight] = useState(
    elementToObserveRef.current?.getBoundingClientRect().height || 0
  );

  useEffect(() => {
    observerRef.current = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;

      setElementWidth(entry.contentRect.width);
      setElementHeight(entry.contentRect.height);
    });

    if (elementToObserveRef.current) {
      observerRef.current.observe(elementToObserveRef.current);
    }
    return () => observerRef.current?.disconnect();
  }, [elementToObserveRef]);

  return {
    width: elementWidth,
    height: elementHeight,
  };
};
