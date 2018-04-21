import { Manager } from './manager';
import { iter } from './utils';
import { PolyShape } from './shapes';
import { convertHSLAToRGBA, RGBAColour } from './hsla';

const PASSIVE_NO_CAPTURE_FLAGS = {
  capture: false,
  passive: true,
};

(function() {
  const canvas = document.querySelector('canvas') as HTMLCanvasElement;
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
  const manager = new Manager(ctx, window.innerWidth, window.innerHeight);

  function sizeCanvas() {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    canvas.setAttribute('width', windowWidth.toString());
    canvas.setAttribute('height', windowHeight.toString());
    manager.updateScreenSize(windowWidth, windowHeight);
  }
  window.addEventListener('resize', sizeCanvas, PASSIVE_NO_CAPTURE_FLAGS);
  sizeCanvas();

  canvas.addEventListener(
    'touchstart',
    (event: TouchEvent) => {
      event.preventDefault();
      iter(event.changedTouches, touch => {
        manager.addNewShape(touch.identifier, touch.pageX, touch.pageY);
      });
    },
    false,
  );
  canvas.addEventListener(
    'touchmove',
    (event: TouchEvent) => {
      event.preventDefault();
      iter(event.changedTouches, touch => {
        manager.cloneShape(touch.identifier, touch.pageX, touch.pageY);
      });
    },
    false,
  );

  let isMouseDown = false;
  canvas.addEventListener(
    'mousedown',
    event => {
      isMouseDown = true;
      manager.addNewShape(-1, event.pageX, event.pageY);
    },
    PASSIVE_NO_CAPTURE_FLAGS,
  );
  canvas.addEventListener(
    'mousemove',
    event => {
      if (isMouseDown) {
        manager.cloneShape(-1, event.pageX, event.pageY);
      }
    },
    PASSIVE_NO_CAPTURE_FLAGS,
  );

  canvas.addEventListener(
    'mouseup',
    () => (isMouseDown = false),
    PASSIVE_NO_CAPTURE_FLAGS,
  );

  canvas.addEventListener(
    'mouseleave',
    () => (isMouseDown = false),
    PASSIVE_NO_CAPTURE_FLAGS,
  );

  function tick() {
    requestAnimationFrame(() => {
      tick();
      manager.drawAll();
    });
  }
  tick();
})();
