(()=>{const t=10,s=100;class i{static random(t,s,i){let h,r;return Math.random()<.5?(h=e,r=3+Math.round(6*Math.random())):(h=a,r=4+Math.round(7*Math.random())),new h(t,s,r,i)}get isVisible(){return this.alpha>.01}clone(t){return new this.klass(this.ctx,this.colour,this.vertices,t)}draw(){this.ctx.beginPath(),this.drawVertices(),this.ctx.fillStyle=this.fillStyle,this.ctx.fill(),this.ctx.beginPath(),this.setStrokeStyles(),this.drawVertices(),this.ctx.closePath(),this.ctx.stroke(),this.fade()}get fillStyle(){const t=this.colour.a*this.alpha;return`rgba(${this.colour.r}, ${this.colour.g}, ${this.colour.b} , ${t})`}get isFadedOut(){return this.alpha<.01}fade(){this.alpha=this.alpha*=.9}setStrokeStyles(){this.ctx.strokeStyle=`rgba(255, 255, 255, ${this.alpha})`,this.ctx.lineWidth=3,this.ctx.lineCap="round"}constructor(t,s,i,e){this.ctx=t,this.colour=s,this.vertices=i,this.alpha=1,this.x=e.x,this.y=e.y,this.radius=e.radius,this.angle=e.angle}}class e extends i{drawVertices(){var t,s,i;for(let e=0;e<this.vertices;e+=1)i=this.angle+2*Math.PI*e/this.vertices,t=this.x+this.radius*Math.cos(i),s=this.y+this.radius*Math.sin(i),0===e?this.ctx.moveTo(t,s):this.ctx.lineTo(t,s)}constructor(...t){super(...t),this.klass=e}}class a extends i{drawVertices(){const t=2*this.vertices;let s,i,e,a;for(let h=0;h<t;h+=1)a=this.angle+2*Math.PI*h/t,e=h%2?.6*this.radius:this.radius,s=this.x+e*Math.cos(a),i=this.y+e*Math.sin(a),0===h?this.ctx.moveTo(s,i):this.ctx.lineTo(s,i)}constructor(...t){super(...t),this.klass=a}}class h{static initial(s,i){return new h(s,i,t,0)}static fromPrevious(i,e,a){const r=a.x-i,n=a.y-e,o=Math.sqrt(r*r+n*n),c=Math.min(Math.max(o,t),s),d=Math.atan(r/n);return new h(i,e,c,d)}constructor(t,s,i,e){this.x=t,this.y=s,this.radius=i,this.angle=e}}function r(t,s){return t/s}var n=function(t,s,i){return i<0&&(i+=1),i>1&&(i-=1),i<1/6?t+6*(s-t)*i:i<.5?s:i<2/3?t+(s-t)*(2/3-i)*6:t};class o{addNewShape(t,s,e){const a=function(t,s,i,e){let a;if(t=r(Math.round(t)%360,360),s=r(Math.round(s)%101,100),i=r(Math.round(i)%101,100),0===s){const t=Math.round(Math.round(255*i));a={r:t,g:t,b:t,a:e}}else{const h=i<.5?i*(1+s):i+s-i*s,r=2*i-h;a={r:parseInt((256*n(r,h,t+1/3)).toFixed(0),10),g:parseInt((256*n(r,h,t)).toFixed(0),10),b:parseInt((256*n(r,h,t-1/3)).toFixed(0),10),a:e}}return a}((new Date).getTime()%360,100,50,1),o=h.initial(s,e),c=i.random(this.ctx,a,o);this.dataById[`${t}`]={shapes:[c],lastCoordinates:o}}cloneShape(t,s,i){const{shapes:e,lastCoordinates:a}=this.dataById[`${t}`];if(!e)return;const r=h.fromPrevious(s,i,a),n=(o=e,o[o.length-1]).clone(r);var o;e.push(n),this.dataById[`${t}`].lastCoordinates=r}updateScreenSize(t,s){this.width=t,this.height=s}drawAll(){this.ctx.clearRect(0,0,this.width,this.height);for(const t in this.dataById){const{shapes:s}=this.dataById[t],i=[];s.forEach((t=>{t.draw(),t.isVisible&&i.push(t)})),this.dataById[t].shapes=i}}constructor(t,s,i){this.ctx=t,this.width=s,this.height=i,this.dataById={}}}let c,d,l;function u(){requestAnimationFrame((()=>{u(),null==l||l.drawAll()}))}!function(t){t[t.Init=0]="Init",t[t.UpdateSize=1]="UpdateSize",t[t.AddShape=2]="AddShape",t[t.CloneShape=3]="CloneShape"}(c||(c={})),onmessage=function(t){const s=t.data;switch(s.type){case c.Init:d=s.canvas;const t=d.getContext("2d");l=new o(t,s.width,s.height),u();break;case c.UpdateSize:d.width=s.width,d.height=s.height,l.updateScreenSize(s.width,s.height);break;case c.AddShape:l.addNewShape(s.identifier,s.x,s.y);break;case c.CloneShape:l.cloneShape(s.identifier,s.x,s.y)}}})();
//# sourceMappingURL=worker.176310b6.js.map
