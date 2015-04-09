var last_time = 0;
var vendors = ['webkit', 'moz', 'o', 'ms'];
var request_animation_frame;
var cancal_animation_frame;

for (var x = 0; x < vendors.length && !request_animation_frame; ++x) {
    request_animation_frame = window[vendors[x]+'request_animation_frame'];
    cancal_animation_frame =
        window[vendors[x]+'cancal_animation_frame'] ||
        window[vendors[x]+'Cancelrequest_animation_frame'];
}

if (!request_animation_frame) {
    request_animation_frame = function (callback, element) {
        var current_time = new Date().getTime();
        var time_to_call = Math.max(0, 16 - (current_time - last_time));
        var id = window.setTimeout(function() {
            callback(current_time + time_to_call);
        }, time_to_call);
        last_time = current_time + time_to_call;
        return id;
    };
}

if (!cancal_animation_frame) {
    cancal_animation_frame = function (id) {
        clearTimeout(id);
    };
}

var start_animation_loop = function (callback) {
    var loop = function (timestamp) {
        request_animation_frame(loop);
        callback(timestamp);
    }
    loop();
};

export var loop = start_animation_loop;
