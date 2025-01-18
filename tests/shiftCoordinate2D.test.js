import { Point } from '@flatten-js/core';
import { shiftCoordinate2D } from '../src/functions/general.js';

describe('shiftCoordinate2D', () => {
    test('shifts coordinates correctly for valid Point instances', () => {
        const A = new Point(5, 7);
        const B = new Point(2, 3);
        const result = shiftCoordinate2D(A, B);
        expect(result.x).toBe(3);
        expect(result.y).toBe(4);
    });

    test('returns a new Point instance', () => {
        const A = new Point(1, 1);
        const B = new Point(0, 0);
        const result = shiftCoordinate2D(A, B);
        expect(result).toBeInstanceOf(Point);
    });

    test('throws TypeError if A is not a Point instance', () => {
        const A = { x: 5, y: 7 };
        const B = new Point(2, 3);
        expect(() => shiftCoordinate2D(A, B)).toThrow(TypeError);
    });

    test('throws TypeError if B is not a Point instance', () => {
        const A = new Point(5, 7);
        const B = { x: 2, y: 3 };
        expect(() => shiftCoordinate2D(A, B)).toThrow(TypeError);
    });

    test('throws TypeError if neither A nor B are Point instances', () => {
        const A = { x: 5, y: 7 };
        const B = { x: 2, y: 3 };
        expect(() => shiftCoordinate2D(A, B)).toThrow(TypeError);
    });
});