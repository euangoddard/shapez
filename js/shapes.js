define([], function () {
    'use strict';
    var RADIUS = {
        MIN: 10,
        MAX: 100
    };

    var PolyShape = function (ctx, colour) {
        this.ctx = ctx;
        this.colour = colour;
        this.x = null;
        this.y = null;
        this.radius = RADIUS.MIN;
    };;

    PolyShape.prototype = {
        move: function (x, y) {
            if (this.x && this.y) {
                var delta_r;
                var delta_x = this.x - x;
                var delta_y = this.y - y;
                delta_r = Math.sqrt(delta_x * delta_x + delta_y * delta_y);
                this.radius = Math.min(Math.max(delta_r, RADIUS.MIN), RADIUS.MAX);
            }

            this.x = x;
            this.y = y;
        },

        draw: function () {
            throw new Error('not implemented');
        }
    };

    var Polygon = function (ctx, colour, vertices) {
        PolyShape.call(this, ctx, colour);
        this.vertices = vertices;
    };
    Polygon.prototype = Object.create(PolyShape.prototype);
    Polygon.prototype.draw = function () {
        this.ctx.beginPath();
        this._draw_polygon_points();
        this.ctx.fillStyle = this.colour;
        this.ctx.fill();
        
        this.ctx.beginPath();
        set_ctx_stoke_styles(this.ctx);
        this._draw_polygon_points();
        this.ctx.closePath();
        this.ctx.stroke();
        
    };
    Polygon.prototype._draw_polygon_points = function () {
        var x, y, angle;
        for (var i = 0; i < this.vertices; i+=1) {
            angle = (2 * Math.PI * i / this.vertices);
            x = this.x + (this.radius * Math.cos(angle));
            y = this.y + (this.radius * Math.sin(angle));
            
            if (i === 0) {
                this.ctx.moveTo(x, y);
            } else {
                this.ctx.lineTo(x, y);
            }

        }
    };

    var Polystar = function (ctx, colour, vertices) {
        PolyShape.call(this, ctx, colour);
        this.vertices = vertices * 2;
    }
    Polystar.prototype = Object.create(PolyShape.prototype);
    Polystar.prototype.draw = function () {
        this.ctx.beginPath();
        this._draw_polystar_points();
        this.ctx.fillStyle = this.colour;
        this.ctx.fill();
        
        this.ctx.beginPath();
        set_ctx_stoke_styles(this.ctx);
        this._draw_polystar_points();
        this.ctx.closePath();
        this.ctx.stroke();
    };
    Polystar.prototype._draw_polystar_points = function () {
        var x, y, radius, angle;
        for (var i = 0; i < this.vertices; i+=1) {
            angle = 2 * Math.PI * i / this.vertices;
            if (i % 2) {

                radius = 0.6 * this.radius;
            } else {
                radius = this.radius;
            }

            x = this.x + (radius * Math.cos(angle));
            y = this.y + (radius * Math.sin(angle));
            
            if (i === 0) {
                this.ctx.moveTo(x, y);
            } else {
                this.ctx.lineTo(x, y);
            }
        }
    };

    var set_ctx_stoke_styles = function (ctx) {
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
    };

    var get_random_shape = function (ctx, colour) {
        var contructor, vertices;
        var style_choice = Math.random();
        if (style_choice < 0.5) {
            contructor = Polygon;
            vertices = 3 + Math.round(Math.random() * 6);
        } else {
            contructor = Polystar;
            vertices = 4 + Math.round(Math.random() * 7);
        }
        return new contructor(ctx, colour, vertices);
    };

    return {
        random: get_random_shape
    };

});
