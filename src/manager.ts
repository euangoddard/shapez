import { PolyShape, Coordinates } from './shapes';
import { convertHSLAToRGBA, RGBAColour } from './hsla';

export class Manager {
  private readonly dataById: { [id: string]: ManagedItem } = {};

  constructor(
    private ctx: OffscreenCanvasRenderingContext2D,
    private width: number,
    private height: number,
  ) {}

  addNewShape(shapeId: number, x: number, y: number): void {
    const currentTime = new Date().getTime();
    const colour = convertHSLAToRGBA(currentTime % 360, 100, 50, 1);
    const coordinates = Coordinates.initial(x, y);
    const shape = PolyShape.random(this.ctx, colour, coordinates);
    this.dataById[`${shapeId}`] = {
      shapes: [shape],
      lastCoordinates: coordinates,
    };
  }

  cloneShape(shapeId: number, x: number, y: number): void {
    const { shapes, lastCoordinates } = this.dataById[`${shapeId}`];
    if (!shapes) {
      return;
    }

    const coordinates = Coordinates.fromPrevious(x, y, lastCoordinates);
    const shape = last(shapes).clone(coordinates);
    shapes.push(shape);
    this.dataById[`${shapeId}`].lastCoordinates = coordinates;
  }

  updateScreenSize(width: number, height: number): void {
    this.width = width;
    this.height = height;
  }

  drawAll(): void {
    this.ctx.clearRect(0, 0, this.width, this.height);
    for (const id in this.dataById) {
      const { shapes } = this.dataById[id];
      const visibleShapes: PolyShape[] = [];
      shapes.forEach(shape => {
        shape.draw();
        if (shape.isVisible) {
          visibleShapes.push(shape);
        }
      });
      this.dataById[id].shapes = visibleShapes;
    }
  }
}

export interface ManagedItem {
  shapes: PolyShape[];
  lastCoordinates: Coordinates;
}

function last<T>(array: T[]): T {
  return array[array.length - 1];
}
