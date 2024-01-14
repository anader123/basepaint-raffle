import React, { useState, useRef, useEffect } from "react";
import PaintButton from "./PaintButton";
type Point2D = { x: number; y: number };

export enum PixelColor {
  White = 0,
  Black = 1,
}

export const Draw: React.FC = () => {
  const canvasSize = 144;
  let scale = 3;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [drawing, setDrawing] = useState(false);
  const [color, setColor] = useState("white");
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const [pixelMap, setPixelMap] = useState<Map<Point2D, PixelColor>>(new Map());

  if (window.innerWidth <= 768) {
    scale = 2;
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (ctx) {
      setContext(ctx);
    }
  }, []);

  const draw = (e: React.MouseEvent) => {
    if (!context || !drawing) return;

    const rect = canvasRef.current?.getBoundingClientRect();
    const x = e.clientX - (rect?.left ?? 0);
    const y = e.clientY - (rect?.top ?? 0);

    const scaledX = Math.floor(x / scale);
    const scaledY = Math.floor(y / scale);

    context.fillStyle = color;
    context.fillRect(scaledX * scale, scaledY * scale, scale, scale);

    const currentColor: PixelColor = "white"
      ? PixelColor.White
      : PixelColor.Black;
    const point: Point2D = { x: scaledX, y: scaledY };
    pixelMap.set(point, currentColor);
    setPixelMap(new Map(pixelMap));
  };

  return (
    <div className="w-full flex flex-col items-center justify-center mt-6">
      <canvas
        ref={canvasRef}
        width={canvasSize * scale}
        height={canvasSize * scale}
        onMouseDown={() => setDrawing(true)}
        onMouseUp={() => setDrawing(false)}
        onMouseOut={() => setDrawing(false)}
        onMouseMove={draw}
        className="border bg-black"
      />

      <div className="my-6 flex gap-2 items-center mb-4">
        <button
          className={`w-8 h-8 bg-white rounded-sm ${
            color === "white" ? "border-2 border-red-600" : ""
          }`}
          onClick={() => setColor("white")}
        ></button>
        <button
          className={`w-8 h-8 bg-black rounded-sm ${
            color === "black" ? "border-2 border-red-600" : ""
          }`}
          onClick={() => setColor("black")}
        ></button>
      </div>

      <PaintButton pixelMap={pixelMap} />
    </div>
  );
};
