import { useState, useEffect, RefObject } from "react";

export interface ElementSizeType {
  width: number;
  height: number;
}

export const useElementSizeByWindowResize = (elementRef: RefObject<HTMLElement>): ElementSizeType => {
  const [elementWidth, setElementWidth] = useState(
    elementRef.current?.getBoundingClientRect().width || 0
  );
  const [elementHeight, setElementHeight] = useState(
    elementRef.current?.getBoundingClientRect().height || 0
  );

  useEffect(() => {
    const handleResize = (): void => {
      if (!elementRef.current) return
      const { width, height } = elementRef.current.getBoundingClientRect()
      setElementWidth(width)
      setElementHeight(height)
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [elementRef]);

  return {
    width: elementWidth,
    height: elementHeight,
  };
};
