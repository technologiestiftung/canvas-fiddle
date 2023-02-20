import { FC, useEffect, useRef } from "react";

const SQUARE_WIDTH = 150;

export const Canvas: FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef || !canvasRef.current) return;

    const ctx = canvasRef.current.getContext("2d");

    const xPos = canvasRef.current.width / 2 - SQUARE_WIDTH / 2;
    const yPos = canvasRef.current.height / 2 - SQUARE_WIDTH / 2;

    ctx?.fillRect(xPos, yPos, SQUARE_WIDTH, SQUARE_WIDTH);
  }, [canvasRef]);

  return (
    <div id="canvasContainer">
      <canvas
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
      />
    </div>
  );
};
