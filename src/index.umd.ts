import { Klee } from "./klee";

window.addEventListener("load", () => {
  document.querySelectorAll('canvas.klee').forEach((canvas) => new Klee(canvas as HTMLCanvasElement))
})
