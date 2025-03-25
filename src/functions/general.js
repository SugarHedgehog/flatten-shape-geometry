import { Point, Segment, Line} from '@flatten-js/core';
import { subtract, dot, multiply, add } from 'mathjs';

/**
 * Checks if three given side lengths can form a valid triangle.
 * 
 * @param {number} a - The length of the first side.
 * @param {number} b - The length of the second side.
 * @param {number} c - The length of the third side.
 * @returns {boolean} True if the sides form a valid triangle, false otherwise.
 */
export function isValidTriangle(a, b, c) {
    return a > 0 && b > 0 && c > 0 && a + b > c && a + c > b && b + c > a;
}

/**
 * Checks if four given side lengths can form a valid quadrilateral.
 * 
 * @param {number} a - The length of the first side.
 * @param {number} b - The length of the second side.
 * @param {number} c - The length of the third side.
 * @param {number} d - The length of the firt side.
 * @returns {boolean} True if the sides form a valid quadrilateral, false otherwise.
 */
export function isValidQuadrilateral(a, b, c, d) {
    return Math.abs(a - b) <= c + d && a > 0 && b > 0 && c > 0 && d > 0;
}

/**
 * Calculates the third side of a triangle using the cosine law.
 * 
 * @param {number} a - The length of the first side.
 * @param {number} b - The length of the second side.
 * @param {number} angle - The angle between the two sides in radians.
 * @returns {number} The length of the third side.
 */
export function calculateThirdSideUsingCosineLaw(a, b, angle) {
    if (!Number.isFinite(a)) {
        throw new Error('Parameter "a" must be a finite number');
    }
    if (!Number.isFinite(b)) {
        throw new Error('Parameter "b" must be a finite number');
    }
    if (!Number.isFinite(angle)) {
        throw new Error('Parameter "angle" must be a finite number');
    }
    if (a < 0) {
        throw new Error('Side length "a" must be non-negative');
    }
    if (b < 0) {
        throw new Error('Side length "b" must be non-negative');
    }
    if (angle < 0 || angle > Math.PI) {
        throw new Error('Angle must be between 0 and π radians');
    }
    return Math.sqrt(a * a + b * b - 2 * a * b * Math.cos(angle));
}

/**
 * Shifts a 2D coordinate by subtracting the coordinates of another point.
 * 
 * @param {Point} A - The point to be shifted.
 * @param {Point} B - The point to subtract from A.
 * @returns {Point} A new point representing the shifted coordinates.
 * @throws {TypeError} If either A or B is not an instance of Point.
 */
export function shiftCoordinate2D(A, B) {
    if (!(A instanceof Point) || !(B instanceof Point)) {
        throw new TypeError("Arguments must be instances of Point");
    }
    return new Point(A.x - B.x, A.y - B.y);
}

/**
 * Finds the circumcenter of a triangle formed by three 2D points.
 * 
 * @param {Point} A - The first point of the triangle.
 * @param {Point} B - The second point of the triangle.
 * @param {Point} C - The third point of the triangle.
 * @returns {Point} The circumcenter of the triangle.
 * @throws {TypeError} If any of A, B, or C is not an instance of Point.
 * @throws {Error} If the points are collinear and the circumcenter cannot be determined.
 */
export function findCircumcenter2D(A, B, C) {
    if (!(A instanceof Point) || !(B instanceof Point) || !(C instanceof Point)) {
        throw new TypeError("Arguments must be instances of Point");
    }

    // Calculate the circumcenter in 2D
    const D = 2 * (A.x * (B.y - C.y) + B.x * (C.y - A.y) + C.x * (A.y - B.y));
    if (D === 0) {
        throw new Error("The points are collinear, circumcenter cannot be determined.");
    }

    const Ux = (1 / D) * ((A.x * A.x + A.y * A.y) * (B.y - C.y) + (B.x * B.x + B.y * B.y) * (C.y - A.y) + (C.x * C.x + C.y * C.y) * (A.y - B.y));
    const Uy = (1 / D) * ((A.x * A.x + A.y * A.y) * (C.x - B.x) + (B.x * B.x + B.y * B.y) * (A.x - C.x) + (C.x * C.x + C.y * C.y) * (B.x - A.x));

    return new Point(Ux, Uy);
}

/**
 * Calculates the perpendicular from a point to a segment
 * 
 * @param {Point} point - The point from which to calculate the perpendicular
 * @param {Segment} segment - The segment to which the perpendicular is calculated
 * @returns {Array} [number, Segment]
 * @throws {TypeError} If point is not an instance of Point or segment is not an instance of Segment
 */
export function perpendicular(point, segment) {
    if (!(point instanceof Point))
        throw new TypeError("point must be instances of Point. typeof point: "+ typeof point);

    if (!(segment instanceof Segment))
        throw new TypeError("segment must be instances of Segment. typeof point: "+ typeof segment);

    if(new Line(segment.pe, segment.ps).contains(point))
        throw new Error("The point and the segment lie on the same straight line");

    const [x1, y1] = [segment.start.x, segment.start.y];
    const [x2, y2] = [segment.end.x, segment.end.y];

    const [x0, y0] = [point.x, point.y];

    // Create vectors using math.js
    const lineVector = subtract([x2, y2], [x1, y1]);
    const pointVector = subtract([x0, y0], [x1, y1]);

    // Project pointVector onto lineVector
    const lineLengthSquared = dot(lineVector, lineVector);
    const projectionFactor = dot(pointVector, lineVector) / lineLengthSquared;
    const projection = multiply(lineVector, projectionFactor);

    // Calculate the foot of the perpendicular
    const foot = add([x1, y1], projection);
    const footPoint = new Point(foot[0], foot[1]);

    return point.distanceTo(footPoint);
}

/**
 * Calculates the foot of the perpendicular from a point to a segment
 * 
 * @param {Point} point - The point from which to calculate the perpendicular
 * @param {Segment} segment - The segment to which the perpendicular is calculated
 * @returns {Point} The foot of the perpendicular point
 * @throws {TypeError} If point is not an instance of Point or segment is not an instance of Segment
 */
export function calculateFootOfPerpendicular(point, segment){
    return perpendicular(point, segment)[1].pe;
}
