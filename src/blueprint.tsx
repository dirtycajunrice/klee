'use client';
import React, { useRef, useEffect } from 'react';
import { Klee } from "./klee";

const Blueprint = ({ code, className }: { code?: string, className?: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const kleeInstance = useRef<Klee | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      kleeInstance.current = new Klee(canvasRef.current);
      kleeInstance.current.display(code)
    }
  }, [ code ]);

  return <canvas ref={canvasRef} className={"klee" + className ? ` ${className}` : ''} />;

};
Blueprint.displayName = "Blueprint";
export { Blueprint };
