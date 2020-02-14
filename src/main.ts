import { iter } from './utils';
import { WorkerClient } from './worker.client';

const PASSIVE_NO_CAPTURE_FLAGS = {
  capture: false,
  passive: true,
};

(function() {
  const workerClient = new WorkerClient();
  const canvas = document.querySelector('canvas') as HTMLCanvasElement;
  workerClient.initializeCanvas(canvas, window.innerWidth, window.innerHeight);

  function sizeCanvas() {
    workerClient.updateSize(window.innerWidth, window.innerHeight);
  }
  window.addEventListener('resize', sizeCanvas, PASSIVE_NO_CAPTURE_FLAGS);
  sizeCanvas();

  canvas.addEventListener(
    'touchstart',
    (event: TouchEvent) => {
      event.preventDefault();
      removeInfo();
      iter(event.changedTouches, touch => {
        workerClient.addShape(touch.identifier, touch.pageX, touch.pageY);
      });
    },
    false,
  );
  canvas.addEventListener(
    'touchmove',
    (event: TouchEvent) => {
      event.preventDefault();
      iter(event.changedTouches, touch => {
        workerClient.cloneShape(touch.identifier, touch.pageX, touch.pageY);
      });
    },
    false,
  );

  let isMouseDown = false;
  canvas.addEventListener(
    'mousedown',
    event => {
      removeInfo();
      isMouseDown = true;
      workerClient.addShape(-1, event.pageX, event.pageY);
    },
    PASSIVE_NO_CAPTURE_FLAGS,
  );
  canvas.addEventListener(
    'mousemove',
    event => {
      if (isMouseDown) {
        workerClient.cloneShape(-1, event.pageX, event.pageY);
      }
    },
    PASSIVE_NO_CAPTURE_FLAGS,
  );

  canvas.addEventListener('mouseup', () => (isMouseDown = false), PASSIVE_NO_CAPTURE_FLAGS);

  canvas.addEventListener('mouseleave', () => (isMouseDown = false), PASSIVE_NO_CAPTURE_FLAGS);

  function removeInfo() {
    const text = document.querySelector('.info-text') as HTMLElement;
    text.classList.add('faded');
  }
})();
