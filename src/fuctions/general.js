import { Point} from '@flatten-js/core';
import { matrix, multiply, inv } from 'mathjs';

export function isValidTriangle(a, b, c) {
    return a > 0 && b > 0 && c > 0 && a + b > c && a + c > b && b + c > a;
}

export function calculateThirdSideUsingCosineLaw(a, b, angle) {
    return Math.sqrt(a * a + b * b - 2 * a * b * Math.cos(angle));
}

export function shiftCoordinate2D(A, B) {
    if (!(A instanceof Point) || !(B instanceof Point)) {
        throw new TypeError("Arguments must be instances of Point");
    }
    return new Point(A.x - B.x, A.y - B.y);
}

export function findCircumcenter2D(A, B, C) {
    if (!(A instanceof Point) || !(B instanceof Point) || !(C instanceof Point)) {
        throw new TypeError("Arguments must be instances of Point");
    }

    const D = 2 * (A.x * (B.y - C.y) + B.x * (C.y - A.y) + C.x * (A.y - B.y));
    if (D === 0) {
        throw new Error("The points are collinear, circumcenter cannot be determined.");
    }

    const a = matrix([
        [A.x, A.y, 1],
        [B.x, B.y, 1],
        [C.x, C.y, 1]
    ]);

    const b = matrix([
        [A.x * A.x + A.y * A.y],
        [B.x * B.x + B.y * B.y],
        [C.x * C.x + C.y * C.y]
    ]);

    const aInv = inv(a);
    const result = multiply(aInv, b);

    const Ux = result.get([0, 0]);
    const Uy = result.get([1, 0]);

    return new Point(Ux, Uy);
}