import { useEffect, useRef, useState } from "react";

export const useWindowSizeResizeObserver = (
  elementToObserve = document.body
) => {
  const observerRef = useRef<ResizeObserver | null>(null);
  const [elementWidth, setElementWidth] = useState(
    elementToObserve.getBoundingClientRect().width
  );
  const [elementHeight, setElementHeight] = useState(
    elementToObserve.getBoundingClientRect().height
  );

  useEffect(() => {
    observerRef.current = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;

      setElementWidth(entry.contentRect.width);
      setElementHeight(entry.contentRect.height);
    });

    observerRef.current.observe(elementToObserve);
    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  return {
    width: elementWidth,
    height: elementHeight,
  };
};
