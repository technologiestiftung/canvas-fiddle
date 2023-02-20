import { useState, useEffect, RefObject } from "react";

export interface ElementSizeType {
  width: number;
  height: number;
}

export const useElementSizeByAnimationFrame = (elementRef: RefObject<HTMLElement>): ElementSizeType => {
  const [elementWidth, setElementWidth] = useState(
    elementRef.current?.getBoundingClientRect().width || 0
  );
  const [elementHeight, setElementHeight] = useState(
    elementRef.current?.getBoundingClientRect().height || 0
  );

  useEffect(() => {
    let req: number;
    function handleAnimationFrame(): void {
      if (!elementRef.current) return
      const { width, height } = elementRef.current.getBoundingClientRect()
      setElementWidth(width)
      setElementHeight(height)

      req = window.requestAnimationFrame(handleAnimationFrame)
    };

    req = window.requestAnimationFrame(handleAnimationFrame)

    return () => window.cancelAnimationFrame(req);
  }, [elementRef]);

  return {
    width: elementWidth,
    height: elementHeight,
  };
};
