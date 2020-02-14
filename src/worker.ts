import { Manager } from './manager';
import { WorkerMessageTypes } from './message.types';

let canvas: OffscreenCanvas;
let manager: Manager;

onmessage = function(event) {
  const data = event.data;
  switch (data.type as WorkerMessageTypes) {
    case WorkerMessageTypes.Init:
      canvas = data.canvas;
      const ctx = canvas.getContext('2d')!;
      manager = new Manager(ctx, data.width, data.height);
      tick();
      break;
    case WorkerMessageTypes.UpdateSize:
      canvas.width = data.width;
      canvas.height = data.height;
      manager.updateScreenSize(data.width, data.height);
      break;
    case WorkerMessageTypes.AddShape:
      manager.addNewShape(data.identifier, data.x, data.y);
      break;
    case WorkerMessageTypes.CloneShape:
      manager.cloneShape(data.identifier, data.x, data.y);
      break;
  }
};

function tick() {
  requestAnimationFrame(() => {
    tick();
    manager?.drawAll();
  });
}
