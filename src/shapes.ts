import { RGBAColour } from './hsla';

const RADIUS = {
  MIN: 10,
  MAX: 100,
};

export abstract class PolyShape {
  protected x: number = 0;
  protected y: number = 0;
  protected radius = RADIUS.MIN;
  protected angle = 0;
  protected abstract vertices: number;
  private alpha = 1;

  static random(
    ctx: CanvasRenderingContext2D,
    colour: RGBAColour,
  ): Polygon | Polystar {
    let shape: typeof Polygon | typeof Polystar;
    let vertices: number;
    const styleChoice = Math.random();
    if (styleChoice < 0.5) {
      shape = Polygon;
      vertices = 3 + Math.round(Math.random() * 6);
    } else {
      shape = Polystar;
      vertices = 4 + Math.round(Math.random() * 7);
    }
    return new shape(ctx, colour, vertices);
  }

  constructor(
    protected ctx: CanvasRenderingContext2D,
    protected colour: RGBAColour,
  ) {}
  move(x: number, y: number): void {
    if (this.x && this.y) {
      const deltaX = this.x - x;
      const deltaY = this.y - y;
      const deltaR = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      this.radius = Math.min(Math.max(deltaR, RADIUS.MIN), RADIUS.MAX);
      this.angle = Math.atan(deltaX / deltaY);
    }
    this.x = x;
    this.y = y;
  }

  draw(): void {
    this.ctx.beginPath();
    this.drawVertices();
    this.ctx.fillStyle = this.fillStyle;
    this.ctx.fill();

    this.ctx.beginPath();
    this.setStrokeStyles();
    this.drawVertices();
    this.ctx.closePath();
    this.ctx.stroke();

    this.fade();
  }

  private get fillStyle(): string {
    const alpha = this.colour.a * this.alpha;
    return `rgba(${this.colour.r}, ${this.colour.g}, ${
      this.colour.b
    } , ${alpha})`;
  }

  get isFadedOut(): boolean {
    return this.alpha < 0.01;
  }

  private fade() {
    this.alpha = this.alpha *= 0.99;
  }

  protected abstract drawVertices(): void;

  private setStrokeStyles() {
    this.ctx.strokeStyle = '#fff';
    this.ctx.lineWidth = 3;
    this.ctx.lineCap = 'round';
  }
}

class Polygon extends PolyShape {
  constructor(
    ctx: CanvasRenderingContext2D,
    colour: RGBAColour,
    protected vertices: number,
  ) {
    super(ctx, colour);
  }

  protected drawVertices() {
    var x, y, angle;
    for (let i = 0; i < this.vertices; i += 1) {
      angle = this.angle + 2 * Math.PI * i / this.vertices;
      x = this.x + this.radius * Math.cos(angle);
      y = this.y + this.radius * Math.sin(angle);

      if (i === 0) {
        this.ctx.moveTo(x, y);
      } else {
        this.ctx.lineTo(x, y);
      }
    }
  }
}

class Polystar extends PolyShape {
  protected vertices: number;

  constructor(
    ctx: CanvasRenderingContext2D,
    colour: RGBAColour,
    vertices: number,
  ) {
    super(ctx, colour);
    this.vertices = vertices * 2;
  }

  protected drawVertices(): void {
    let x: number;
    let y: number;
    let radius: number;
    let angle: number;
    for (let i = 0; i < this.vertices; i += 1) {
      angle = this.angle + 2 * Math.PI * i / this.vertices;
      if (i % 2) {
        radius = 0.6 * this.radius;
      } else {
        radius = this.radius;
      }

      x = this.x + radius * Math.cos(angle);
      y = this.y + radius * Math.sin(angle);

      if (i === 0) {
        this.ctx.moveTo(x, y);
      } else {
        this.ctx.lineTo(x, y);
      }
    }
  }
}
