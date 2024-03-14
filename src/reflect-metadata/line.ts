import 'reflect-metadata';

export class Point {
  constructor(public x: number, public y: number) {}
}

export class Line {
  private _start: Point;
  private _end: Point;

  @validate
  set start(value: Point) {
    this._start = value;
  }

  get start() {
    return this._start;
  }

  @validate
  set end(value: Point) {
    this._end = value;
  }

  get end() {
    return this._end;
  }
}

function validate<T>(target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<T>) {
  console.log('target:', target);
  console.log('propertyKey:', propertyKey);
  console.log('descriptor:', descriptor);

  let set = descriptor.set!;

  descriptor.set = function (value: T) {
    let type = Reflect.getMetadata('design:type', target, propertyKey);

    if (!(value instanceof type)) {
      throw new TypeError(`Invalid type, got ${typeof value} not ${type.name}.`);
    }

    set.call(this, value);
  };
}
