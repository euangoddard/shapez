import { WorkerMessageTypes } from './message.types';

export class WorkerClient {
  private readonly worker: Worker;

  constructor() {
    this.worker = new Worker(new URL('./worker.ts', import.meta.url), {type: 'module'});
  }

  initializeCanvas(canvas: HTMLCanvasElement, width: number, height: number): void {
    const offscreen = canvas.transferControlToOffscreen();
    this.worker.postMessage(
      {
        type: WorkerMessageTypes.Init,
        canvas: offscreen,
        width,
        height,
      },
      [(offscreen as unknown) as Transferable],
    );
  }

  updateSize(width: number, height: number): void {
    this.worker.postMessage({
      type: WorkerMessageTypes.UpdateSize,
      width,
      height,
    });
  }

  addShape(identifier: number, x: number, y: number): void {
    this.worker.postMessage({
      type: WorkerMessageTypes.AddShape,
      identifier,
      x,
      y,
    });
  }

  cloneShape(identifier: number, x: number, y: number): void {
    this.worker.postMessage({
      type: WorkerMessageTypes.CloneShape,
      identifier,
      x,
      y,
    });
  }
}
