define(['animation', 'hsla', 'shapes', 'lib/shake', 'lib/domReady!'], function (animation, hsla, shapes) {
    'use strict';

    var canvas = document.querySelector('canvas');

    var size_canvas = function () {
        canvas.setAttribute('width', window.innerWidth);
        canvas.setAttribute('height', window.innerHeight);
    };
    window.addEventListener('resize', size_canvas, false);
    size_canvas();

    var ctx = canvas.getContext('2d');

    var shapes_by_id = {};

    var handle_touch_start = function (event) {
        event.preventDefault();
        var touches = event.changedTouches;

        iter(touches, function (touch) {
            var current_time = new Date().getTime();
            var shape = shapes.random(
                ctx,
                hsla(current_time % 360, 100, 50, 1)
            );
            shapes_by_id[touch.identifier] = shape;
            shape.move(touch.pageX, touch.pageY);
            shape.draw();

        });
    };

    var handle_touch_move = function (event) {
        event.preventDefault();
        var touches = event.changedTouches;
        iter(touches, function (touch) {
            var shape = shapes_by_id[touch.identifier];
            shape.move(touch.pageX, touch.pageY);
        });
    };

    var handle_touch_end = function (event) {
        event.preventDefault();
        var touches = event.changedTouches;
        iter(touches, function (touch) {
            delete shapes_by_id[touch.identifier];
        });
    };

    canvas.addEventListener('touchstart', handle_touch_start, false);
    canvas.addEventListener('touchend', handle_touch_end, false);
    canvas.addEventListener('touchcancel', handle_touch_end, false);
    canvas.addEventListener('touchleave', handle_touch_end, false);
    canvas.addEventListener('touchmove', handle_touch_move, false);


    animation.loop(function (timestamp) {
        for (var key in shapes_by_id) {
            if (shapes_by_id.hasOwnProperty(key)) {
                var shape = shapes_by_id[key];
                shape.draw();
            }
        }
    });

    window.addEventListener('shake', size_canvas, false);

    var iter = function (iterable, callback) {
        return Array.prototype.forEach.call(iterable, callback);
    };

});
