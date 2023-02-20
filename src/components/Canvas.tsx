import { FC, useEffect, useRef } from "react";
// import { useElementSizeByWindowResize } from '../lib/hooks/useElementSizeByWindowResize'
// import { useElementSizeByResizeObserver } from '../lib/hooks/useElementSizeByResizeObserver'
import { useElementSizeByAnimationFrame } from "../lib/hooks/useElementSizeByAnimationFrame";

const SQUARE_WIDTH = 150;

export const Canvas: FC = () => {
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // const { width, height } = useElementSizeByWindowResize(canvasContainerRef);
  // const { width, height } = useElementSizeByResizeObserver(canvasContainerRef);
  const { width, height } = useElementSizeByAnimationFrame(canvasContainerRef);

  useEffect(() => {
    if (!canvasRef || !canvasRef.current) return;

    const ctx = canvasRef.current.getContext("2d");

    const xPos = canvasRef.current.width / 2 - SQUARE_WIDTH / 2;
    const yPos = canvasRef.current.height / 2 - SQUARE_WIDTH / 2;

    ctx?.fillRect(xPos, yPos, SQUARE_WIDTH, SQUARE_WIDTH);
  }, [canvasRef, width, height]);

  return (
    <div
      ref={canvasContainerRef}
      id="canvasContainer"
    >
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
      />
    </div>
  );
};
