import { Application } from "./application";

export class Klee {

  private app: Application;

  constructor(canvas: HTMLCanvasElement, app?: Application) {
    if (app !== undefined) {
      this.app = app;
    } else {
      this.app = Application.createOrGet(canvas);
    }
  }

  public display(blueprintText: string): void {
    this.app.loadBlueprintIntoScene(blueprintText);
  }

  public static getInstance(canvas: HTMLCanvasElement) {
    let app = Application.getInstance(canvas);
    if (app !== undefined) {
      return new Klee(canvas, app);
    }
    return undefined;
  }

  public get value(): string {
    return this.app.getBlueprint();
  }
}
