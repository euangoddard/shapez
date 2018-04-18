import { RGBAColour } from './hsla';

const RADIUS = {
  MIN: 10,
  MAX: 100,
};

export abstract class PolyShape {
  protected readonly x: number;
  protected readonly y: number;
  protected readonly radius: number;
  protected readonly angle: number;
  protected abstract klass: typeof Polygon | typeof Polystar;
  private alpha = 1;

  static random(
    ctx: CanvasRenderingContext2D,
    colour: RGBAColour,
    coordinates: Coordinates,
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
    return new shape(ctx, colour, vertices, coordinates);
  }

  constructor(
    protected readonly ctx: CanvasRenderingContext2D,
    protected readonly colour: RGBAColour,
    protected readonly vertices: number,
    coordinates: Coordinates,
  ) {
    this.x = coordinates.x;
    this.y = coordinates.y;
    this.radius = coordinates.radius;
    this.angle = coordinates.angle;
  }

  get isVisible(): boolean {
    return this.alpha > 0.01;
  }

  clone(coordinates: Coordinates): Polygon | Polystar {
    return new this.klass(this.ctx, this.colour, this.vertices, coordinates);
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
    this.alpha = this.alpha *= 0.85;
  }

  protected abstract drawVertices(): void;

  private setStrokeStyles() {
    this.ctx.strokeStyle = `rgba(255, 255, 255, ${this.alpha})`;
    this.ctx.lineWidth = 3;
    this.ctx.lineCap = 'round';
  }
}

class Polygon extends PolyShape {
  protected readonly klass = Polygon;

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
  protected readonly klass = Polystar;

  protected drawVertices(): void {
    const points = this.vertices * 2;
    let x: number;
    let y: number;
    let radius: number;
    let angle: number;
    for (let i = 0; i < points; i += 1) {
      angle = this.angle + 2 * Math.PI * i / points;
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

export class Coordinates {
  static initial(x: number, y: number): Coordinates {
    return new Coordinates(x, y, RADIUS.MIN, 0);
  }

  static fromPrevious(
    x: number,
    y: number,
    previous: Coordinates,
  ): Coordinates {
    const deltaX = previous.x - x;
    const deltaY = previous.y - y;
    const deltaR = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    const radius = Math.min(Math.max(deltaR, RADIUS.MIN), RADIUS.MAX);
    const angle = Math.atan(deltaX / deltaY);
    return new Coordinates(x, y, radius, angle);
  }

  constructor(
    public x: number,
    public y: number,
    public radius: number,
    public angle: number,
  ) {}
}
