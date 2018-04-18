parcelRequire=function(e,r,n){var t="function"==typeof parcelRequire&&parcelRequire,i="function"==typeof require&&require;function u(n,o){if(!r[n]){if(!e[n]){var f="function"==typeof parcelRequire&&parcelRequire;if(!o&&f)return f(n,!0);if(t)return t(n,!0);if(i&&"string"==typeof n)return i(n);var c=new Error("Cannot find module '"+n+"'");throw c.code="MODULE_NOT_FOUND",c}a.resolve=function(r){return e[n][1][r]||r};var l=r[n]=new u.Module(n);e[n][0].call(l.exports,a,l,l.exports)}return r[n].exports;function a(e){return u(a.resolve(e))}}u.isParcelRequire=!0,u.Module=function(e){this.id=e,this.bundle=u,this.exports={}},u.modules=e,u.cache=r,u.parent=t;for(var o=0;o<n.length;o++)u(n[o]);return u}({19:[function(require,module,exports) {
"use strict";var t=this&&this.__extends||function(){var t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,i){t.__proto__=i}||function(t,i){for(var e in i)i.hasOwnProperty(e)&&(t[e]=i[e])};return function(i,e){function r(){this.constructor=i}t(i,e),i.prototype=null===e?Object.create(e):(r.prototype=e.prototype,new r)}}();Object.defineProperty(exports,"__esModule",{value:!0});var i={MIN:10,MAX:100},e=function(){function t(t,i,e){this.ctx=t,this.colour=i,this.alpha=1,this.x=e.x,this.y=e.y,this.radius=e.radius,this.angle=e.angle}return t.random=function(t,i,e){return new r(t,i,e,3+Math.round(6*Math.random()))},Object.defineProperty(t.prototype,"isVisible",{get:function(){return this.alpha>.01},enumerable:!0,configurable:!0}),t.prototype.clone=function(t){return new this.klass(this.ctx,this.colour,t,this.vertices)},t.prototype.draw=function(){this.ctx.beginPath(),this.drawVertices(),this.ctx.fillStyle=this.fillStyle,this.ctx.fill(),this.ctx.beginPath(),this.setStrokeStyles(),this.drawVertices(),this.ctx.closePath(),this.ctx.stroke(),this.fade()},Object.defineProperty(t.prototype,"fillStyle",{get:function(){var t=this.colour.a*this.alpha;return"rgba("+this.colour.r+", "+this.colour.g+", "+this.colour.b+" , "+t+")"},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"isFadedOut",{get:function(){return this.alpha<.01},enumerable:!0,configurable:!0}),t.prototype.fade=function(){this.alpha=this.alpha*=.85},t.prototype.setStrokeStyles=function(){this.ctx.strokeStyle="rgba(255, 255, 255, "+this.alpha+")",this.ctx.lineWidth=3,this.ctx.lineCap="round"},t}();exports.PolyShape=e;var r=function(i){function e(t,r,s,n){var o=i.call(this,t,r,s)||this;return o.vertices=n,o.klass=e,o}return t(e,i),e.prototype.drawVertices=function(){for(var t,i,e,r=0;r<this.vertices;r+=1)e=this.angle+2*Math.PI*r/this.vertices,t=this.x+this.radius*Math.cos(e),i=this.y+this.radius*Math.sin(e),0===r?this.ctx.moveTo(t,i):this.ctx.lineTo(t,i)},e}(e),s=function(i){function e(t,r,s,n){var o=i.call(this,t,r,s)||this;return o.klass=e,o.vertices=2*n,o}return t(e,i),e.prototype.drawVertices=function(){for(var t,i,e,r,s=0;s<this.vertices;s+=1)r=this.angle+2*Math.PI*s/this.vertices,e=s%2?.6*this.radius:this.radius,t=this.x+e*Math.cos(r),i=this.y+e*Math.sin(r),0===s?this.ctx.moveTo(t,i):this.ctx.lineTo(t,i)},e}(e),n=function(){function t(t,i,e,r){this.x=t,this.y=i,this.radius=e,this.angle=r}return t.initial=function(e,r){return new t(e,r,i.MIN,0)},t.fromPrevious=function(e,r,s){var n=s.x-e,o=s.y-r,h=Math.sqrt(n*n+o*o);return new t(e,r,Math.min(Math.max(h,i.MIN),i.MAX),Math.atan(n/o))},t}();exports.Coordinates=n;
},{}],20:[function(require,module,exports) {
"use strict";function r(r,n,o,a){var u;if(r=t(Math.round(r)%360,360),n=t(Math.round(n)%101,100),o=t(Math.round(o)%101,100),0===n){var d=Math.round(Math.round(255*o));u={r:d,g:d,b:d,a:a}}else{var i=o<.5?o*(1+n):o+n-o*n,s=2*o-i;u={r:parseInt((256*e(s,i,r+1/3)).toFixed(0),10),g:parseInt((256*e(s,i,r)).toFixed(0),10),b:parseInt((256*e(s,i,r-1/3)).toFixed(0),10),a:a}}return u}function t(r,t){return r/t}Object.defineProperty(exports,"__esModule",{value:!0}),exports.convertHSLAToRGBA=r;var e=function(r,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?r+6*(t-r)*e:e<.5?t:e<2/3?r+(t-r)*(2/3-e)*6:r};
},{}],11:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var t=require("./shapes"),e=require("./hsla"),a=function(){function a(t,e,a){this.ctx=t,this.width=e,this.height=a,this.dataById={}}return a.prototype.addNewShape=function(a,i,s){var o=(new Date).getTime(),r=e.convertHSLAToRGBA(o%360,100,50,1),h=t.Coordinates.initial(i,s),n=t.PolyShape.random(this.ctx,r,h);this.dataById[""+a]={shapes:[n],lastCoordinates:h}},a.prototype.cloneShape=function(e,a,s){var o=this.dataById[""+e],r=o.shapes,h=o.lastCoordinates;if(r){var n=t.Coordinates.fromPrevious(a,s,h),d=i(r).clone(n);r.push(d),this.dataById[""+e].lastCoordinates=n}},a.prototype.updateScreenSize=function(t,e){this.width=t,this.height=e},a.prototype.drawAll=function(){this.ctx.clearRect(0,0,this.width,this.height);var t=function(t){var a=[];e.dataById[t].shapes.forEach(function(t){t.draw(),t.isVisible&&a.push(t)}),e.dataById[t].shapes=a},e=this;for(var a in this.dataById)t(a)},a}();function i(t){return t[t.length-1]}exports.Manager=a;
},{"./shapes":19,"./hsla":20}],12:[function(require,module,exports) {
"use strict";function e(e,r){return Array.prototype.forEach.call(e,r)}Object.defineProperty(exports,"__esModule",{value:!0}),exports.iter=e;
},{}],4:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("./manager"),n=require("./utils"),t={capture:!1,passive:!0};!function(){var i=document.querySelector("canvas"),r=i.getContext("2d"),a=new e.Manager(r,window.innerWidth,window.innerHeight);function o(){var e=window.innerWidth,n=window.innerHeight;i.setAttribute("width",e.toString()),i.setAttribute("height",n.toString()),a.updateScreenSize(e,n)}window.addEventListener("resize",o,t),o(),i.addEventListener("touchstart",function(e){n.iter(e.changedTouches,function(e){a.addNewShape(e.identifier,e.pageX,e.pageY)})},t),i.addEventListener("touchmove",function(e){n.iter(e.changedTouches,function(e){a.cloneShape(e.identifier,e.pageX,e.pageY)})},t);var d=!1;i.addEventListener("mousedown",function(e){d=!0,a.addNewShape(-1,e.pageX,e.pageY)},t),i.addEventListener("mousemove",function(e){d&&a.cloneShape(-1,e.pageX,e.pageY)},t),i.addEventListener("mouseup",function(){return d=!1},t),i.addEventListener("mouseleave",function(){return d=!1},t),function e(){requestAnimationFrame(function(){e(),a.drawAll()})}()}();
},{"./manager":11,"./utils":12}]},{},[4])
//# sourceMappingURL=/main.62aca55e.map