define(
    ['animation', 'hsla', 'shapes', 'dialogs', 'utils', 'lib/shake', 'lib/domReady!'],
    function (animation, hsla, shapes, dialogs, utils) {
    'use strict';

    var canvas = document.querySelector('canvas');
    var ctx = canvas.getContext('2d');

    var size_canvas = function () {
        var window_width = window.innerWidth;
        var window_height = window.innerHeight;
        canvas.setAttribute('width', window_width);
        canvas.setAttribute('height', window_height);
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, window_width, window_height);
    };
    window.addEventListener('resize', size_canvas, false);
    size_canvas();


    var shapes_by_id = {};

    var handle_touch_start = function (event) {
        event.preventDefault();
        var touches = event.changedTouches;

        utils.iter(touches, function (touch) {
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
        utils.iter(touches, function (touch) {
            var shape = shapes_by_id[touch.identifier];
            shape.move(touch.pageX, touch.pageY);
        });
    };

    var handle_touch_end = function (event) {
        event.preventDefault();
        var touches = event.changedTouches;
        utils.iter(touches, function (touch) {
            delete shapes_by_id[touch.identifier];
        });
    };

    canvas.addEventListener('touchstart', handle_touch_start, false);
    canvas.addEventListener('touchend', handle_touch_end, false);
    canvas.addEventListener('touchcancel', handle_touch_end, false);
    canvas.addEventListener('touchleave', handle_touch_end, false);
    canvas.addEventListener('touchmove', handle_touch_move, false);

    var show_capture_dialog = function () {
        var download_link = document.querySelector('#menu a');
        var data_url = canvas.toDataURL('image/png');
        download_link.setAttribute('href', data_url);

        dialogs.show_menu_dialog();
    };

    var menu_buttons = document.querySelectorAll('#menu button');
    utils.iter(menu_buttons, function (button) {
        if (button.getAttribute('data-action') === 'clear') {
            button.addEventListener('click', function () {
                size_canvas();
                dialogs.hide_menu_dialog();
            }, false);
        }
    });



    window.addEventListener('shake', show_capture_dialog, false);
    window.addEventListener('keyup', show_capture_dialog, false);
    dialogs.show_welcome_dialog();

    animation.loop(function (timestamp) {
        for (var key in shapes_by_id) {
            if (shapes_by_id.hasOwnProperty(key)) {
                var shape = shapes_by_id[key];
                shape.draw();
            }
        }
    });

});
