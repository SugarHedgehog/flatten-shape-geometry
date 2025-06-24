import { Point, Circle} from '@flatten-js/core';
import { findCircumcenter2D } from '../functions/general.js'

export default class CircleByPoints {

  static fromCenterAndPoint(center, pointOnCircumference) {
    if (!(center instanceof Point)) {
        throw new TypeError("center must be a Point instance");
    }

    if (!(pointOnCircumference instanceof Point)) {
        throw new TypeError("pointOnCircumference must be a Point instance");
    }

    const radius = center.distanceTo(pointOnCircumference)[0];

    return new Circle(center, radius);
  }

  static fromThreePoints(point1, point2, point3) {

    if (!(point1 instanceof Point)) {
        throw new TypeError("point1 must be a Point instance");
    }

    if (!(point2 instanceof Point)) {
        throw new TypeError("point2 must be a Point instance");
    }

    if (!(point3 instanceof Point)) {
        throw new TypeError("point3 must be a Point instance");
    }

    const center = findCircumcenter2D(point1, point2, point3);
    const radius = point1.distanceTo(center)[0];

    return new Circle(center, radius);
  }
}

