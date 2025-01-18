import { Point } from '@flatten-js/core';
import { findCircumcenter2D } from '../src/functions/general.js';

describe('findCircumcenter2D', () => {
    test('calculates the circumcenter for a valid triangle', () => {
        const A = new Point(0, 0);
        const B = new Point(3, 0);
        const C = new Point(0, 4);
        const circumcenter = findCircumcenter2D(A, B, C);
        expect(circumcenter.x).toBeCloseTo(1.5);
        expect(circumcenter.y).toBeCloseTo(2);
    });

    test('throws TypeError if any argument is not a Point instance', () => {
        const A = { x: 0, y: 0 };
        const B = new Point(3, 0);
        const C = new Point(0, 4);
        expect(() => findCircumcenter2D(A, B, C)).toThrow(TypeError);
    });

    test('throws Error if points are collinear', () => {
        const A = new Point(0, 0);
        const B = new Point(2, 2);
        const C = new Point(4, 4);
        expect(() => findCircumcenter2D(A, B, C)).toThrow("The points are collinear, circumcenter cannot be determined.");
    });

    test('calculates circumcenter for points forming a right triangle', () => {
        const A = new Point(0, 0);
        const B = new Point(4, 0);
        const C = new Point(0, 3);
        const circumcenter = findCircumcenter2D(A, B, C);
        expect(circumcenter.x).toBeCloseTo(2);
        expect(circumcenter.y).toBeCloseTo(1.5);
    });

    test('calculates circumcenter for points forming an isosceles triangle', () => {
        const A = new Point(0, 0);
        const B = new Point(4, 0);
        const C = new Point(2, Math.sqrt(12));
        const circumcenter = findCircumcenter2D(A, B, C);
        expect(circumcenter.x).toBeCloseTo(2);
        expect(circumcenter.y).toBeCloseTo(1.1547005383792515);
    });
});