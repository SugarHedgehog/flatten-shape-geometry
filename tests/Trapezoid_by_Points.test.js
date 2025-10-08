import Trapezoid from '../src/shape/Trapezoid';
import { Point } from '@flatten-js/core';

describe('Trapezoid (by points)', () => {
    it('should create a trapezoid with given points (plain objects)', () => {
        // AB is horizontal base, CD is parallel and shorter
        const points = [
            { x: 0, y: 0 },
            { x: 6, y: 0 },
            { x: 4, y: 3 },
            { x: 1, y: 3 },
        ];

        const t = new Trapezoid({ points });

        // Lengths
        expect(t.lengthAB).toBeCloseTo(6);
        expect(t.lengthBC).toBeCloseTo(Math.sqrt(13)); // ~3.606
        expect(t.lengthCD).toBeCloseTo(3);
        expect(t.lengthDA).toBeCloseTo(Math.sqrt(10)); // ~3.162

        // Intersection of diagonals moves to (0, 0)
        const intersectionPoint = t.diagonalIntersectionPoint;
        expect(intersectionPoint.x).toBeCloseTo(0);
        expect(intersectionPoint.y).toBeCloseTo(0);

        // Perimeter and area
        expect(t.perimeter).toBeCloseTo(6 + Math.sqrt(13) + 3 + Math.sqrt(10));
        // Area = (sum of parallel sides)/2 * height = (6+3)/2 * 3 = 13.5
        expect(t.area()).toBeCloseTo(13.5);
    });

    it('should create a trapezoid with given points (Point instances)', () => {
        const points = [
            new Point(0, 0),
            new Point(5, 0),
            new Point(4, 2),
            new Point(1, 2),
        ];

        const t = new Trapezoid({ points });

        expect(t.lengthAB).toBeCloseTo(5);
        expect(t.lengthBC).toBeCloseTo(Math.sqrt(5)); // ~2.236
        expect(t.lengthCD).toBeCloseTo(3);
        expect(t.lengthDA).toBeCloseTo(Math.sqrt(5)); // ~2.236

        // Adjacent interior angles finite (sanity check)
        expect(t.angleAInRadians).toBeGreaterThan(0);
        expect(t.angleBInRadians).toBeGreaterThan(0);
        expect(t.angleCInRadians).toBeGreaterThan(0);
        expect(t.angleDInRadians).toBeGreaterThan(0);
    });

    it('should create a trapezoid with shiftCoordinate = false', () => {
        const points = [
            { x: 0, y: 0 },
            { x: 6, y: 0 },
            { x: 4, y: 3 },
            { x: 1, y: 3 },
        ];

        const t = new Trapezoid({ points, supplementary: { shiftCoordinate: false } });

        expect(t.pointA.x).toBeCloseTo(0);
        expect(t.pointA.y).toBeCloseTo(0);
        expect(t.pointB.x).toBeCloseTo(6);
        expect(t.pointB.y).toBeCloseTo(0);
        expect(t.pointC.x).toBeCloseTo(4);
        expect(t.pointC.y).toBeCloseTo(3);
        expect(t.pointD.x).toBeCloseTo(1);
        expect(t.pointD.y).toBeCloseTo(3);
    });

    it('should correctly calculate diagonals when requested (points-based)', () => {
        const points = [
            { x: 0, y: 0 },
            { x: 6, y: 0 },
            { x: 4, y: 3 },
            { x: 1, y: 3 },
        ];

        const t = new Trapezoid({ points, supplementary: { calculateDiagonals: true } });

        const dAC = Math.hypot(4 - 0, 3 - 0);
        const dBD = Math.hypot(6 - 1, 0 - 3);

        expect(t.lengthDiagonalAC).toBeCloseTo(dAC);
        expect(t.lengthDiagonalBD).toBeCloseTo(dBD);

        const diagonalAC = t.diagonalAC;
        expect(diagonalAC.start.x).toBeCloseTo(t.pointA.x);
        expect(diagonalAC.start.y).toBeCloseTo(t.pointA.y);
        expect(diagonalAC.end.x).toBeCloseTo(t.pointC.x);
        expect(diagonalAC.end.y).toBeCloseTo(t.pointC.y);

        const diagonalBD = t.diagonalBD;
        expect(diagonalBD.start.x).toBeCloseTo(t.pointB.x);
        expect(diagonalBD.start.y).toBeCloseTo(t.pointB.y);
        expect(diagonalBD.end.x).toBeCloseTo(t.pointD.x);
        expect(diagonalBD.end.y).toBeCloseTo(t.pointD.y);

        const intersectionPoint = t.diagonalIntersectionPoint;
        expect(intersectionPoint.x).toBeCloseTo(0);
        expect(intersectionPoint.y).toBeCloseTo(0);
    });

    it('should throw an error for invalid points (not a trapezoid: no parallel opposite sides)', () => {
        const invalidPoints = [
            { x: 0, y: 0 },
            { x: 4, y: 0 },
            { x: 6, y: 2 },
            { x: 1, y: 3 },
        ];

        expect(() => new Trapezoid({ points: invalidPoints })).toThrow(/do not form a trapezoid/i);
    });
});
