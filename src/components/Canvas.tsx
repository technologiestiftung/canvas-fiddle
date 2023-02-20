import { FC, useEffect, useRef } from "react";
// import { useWindowSize } from "../lib/hooks/useWindowSize";
import { useWindowSizeResizeObserver } from "../lib/hooks/useWindowSizeResizeObserver";

const SQUARE_WIDTH = 150;

export const Canvas: FC = () => {
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { width: windowWidth, height: windowHeight } =
    useWindowSizeResizeObserver(canvasContainerRef);

  useEffect(() => {
    if (!canvasRef || !canvasRef.current) return;

    const ctx = canvasRef.current.getContext("2d");

    const xPos = canvasRef.current.width / 2 - SQUARE_WIDTH / 2;
    const yPos = canvasRef.current.height / 2 - SQUARE_WIDTH / 2;

    ctx?.fillRect(xPos, yPos, SQUARE_WIDTH, SQUARE_WIDTH);
  }, [canvasRef, windowWidth, windowHeight]);

  return (
    <div
      ref={canvasContainerRef}
      id="canvasContainer"
    >
      <canvas
        ref={canvasRef}
        width={windowWidth}
        height={windowHeight}
      />
    </div>
  );
};
