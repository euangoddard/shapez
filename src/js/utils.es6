export var iter = function (iterable, callback) {
    return Array.prototype.forEach.call(iterable, callback);
};
