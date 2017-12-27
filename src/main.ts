import { iter } from './utils';
import { PolyShape } from './shapes';
import { convertHSLAToRGBA } from './hsla';

(function() {
  const canvas = document.querySelector('canvas') as HTMLCanvasElement;
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

  function sizeCanvas() {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    canvas.setAttribute('width', windowWidth.toString());
    canvas.setAttribute('height', windowHeight.toString());
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, windowWidth, windowHeight);
  }
  window.addEventListener('resize', sizeCanvas, false);
  sizeCanvas();

  const shapesById: { [touchId: string]: PolyShape } = {};

  function handleTouchStart(event: TouchEvent) {
    event.preventDefault();
    var touches = event.changedTouches;

    iter(touches, touch => {
      const currentTime = new Date().getTime();
      var shape = PolyShape.random(
        ctx,
        convertHSLAToRGBA(currentTime % 360, 100, 50, 1),
      );
      shapesById[touch.identifier.toString()] = shape;
      shape.move(touch.pageX, touch.pageY);
      shape.draw();
    });
  }

  function handleTouchMove(event: TouchEvent) {
    event.preventDefault();
    var touches = event.changedTouches;
    iter(touches, touch => {
      const shape = shapesById[touch.identifier.toString()];
      shape.move(touch.pageX, touch.pageY);
    });
  }

  function handleTouchEnd(event: TouchEvent) {
    event.preventDefault();
    var touches = event.changedTouches;
    iter(touches, touch => {
      delete shapesById[touch.identifier];
    });
  }

  canvas.addEventListener('touchstart', handleTouchStart, false);
  canvas.addEventListener('touchend', handleTouchEnd, false);
  canvas.addEventListener('touchcancel', handleTouchEnd, false);
  //   canvas.addEventListener('touchleave', handleTouchEnd, false);
  canvas.addEventListener('touchmove', handleTouchMove, false);

  //   var save_canvas = function() {
  //     canvas.toBlob(function(blob) {
  //       save_as(blob, 'Shapez.png');
  //     });
  //   };

  //   window.addEventListener(
  //     'deviceorientation',
  //     (event: DeviceOrientationEvent) => {
  //       if (event.beta && (event.beta > 170 || event.beta < -170)) {
  //         dialogs.show_menu_dialog();
  //       }
  //     },
  //     false,
  //   );

  //   var menu_buttons = document.querySelectorAll('#menu button');
  //   utils.iter(menu_buttons, function(button) {
  //     var data_action = button.getAttribute('data-action');
  //     if (data_action === 'clear') {
  //       button.addEventListener(
  //         'click',
  //         function() {
  //           sizeCanvas();
  //           dialogs.hide_menu_dialog();
  //         },
  //         false,
  //       );
  //     } else if (data_action === 'save') {
  //       button.addEventListener('click', save_canvas, false);
  //     }
  //   });

  //   window.addEventListener('shake', dialogs.show_menu_dialog, false);
  //   window.addEventListener('keyup', dialogs.show_menu_dialog, false);
  //   dialogs.show_welcome_dialog();

  function tick() {
    requestAnimationFrame(() => {
      tick();
      for (const key in shapesById) {
        if (shapesById.hasOwnProperty(key)) {
          var shape = shapesById[key];
          shape.draw();
          //   console.log('drawing');
        }
      }
    });
  }
  tick();
})();
