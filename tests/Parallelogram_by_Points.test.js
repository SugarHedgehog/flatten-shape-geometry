import Parallelogram from '../src/shape/Parallelogram';
import { Point } from '@flatten-js/core';

describe('Parallelogram (by points)', () => {
    it('should create a parallelogram with given points (plain objects)', () => {
        const points = [
            { x: 0, y: 0 },
            { x: 4, y: 0 },
            { x: 5.5, y: 2 },
            { x: 1.5, y: 2 },
        ];

        const p = new Parallelogram({ points });

        // Lengths
        expect(p.lengthAB).toBeCloseTo(4);
        expect(p.lengthBC).toBeCloseTo(2.5);
        expect(p.lengthCD).toBeCloseTo(4);
        expect(p.lengthDA).toBeCloseTo(2.5);

        // Angles relationships (A + B = π, and opposite angles equal)
        expect(p.angleAInRadians + p.angleBInRadians).toBeCloseTo(Math.PI);
        expect(p.angleCInRadians).toBeCloseTo(p.angleAInRadians);
        expect(p.angleDInRadians).toBeCloseTo(p.angleBInRadians);

        // Specific expected angle at A: between AB(4,0) and AD(1.5,2)
        const expectedAngleA = Math.acos(6 / 10); // cos = (4*1.5 + 0*2) / (|AB|*|AD|) = 6/(4*2.5) = 0.6
        expect(p.angleAInRadians).toBeCloseTo(expectedAngleA);

        // Intersection point of diagonals should be the centroid (0, 0) after shift
        const intersectionPoint = p.diagonalIntersectionPoint;
        expect(intersectionPoint.x).toBeCloseTo(0);
        expect(intersectionPoint.y).toBeCloseTo(0);
    });

    it('should create a parallelogram with given points (plain objects) with shiftCoordinate = false', () => {
        const points = [
            { x: 0, y: 0 },
            { x: 4, y: 0 },
            { x: 5.5, y: 2 },
            { x: 1.5, y: 2 },
        ];

        const p = new Parallelogram({ points, supplementary: { shiftCoordinate: false } });

        expect(p.pointA.x).toBeCloseTo(0);
        expect(p.pointA.y).toBeCloseTo(0);
        expect(p.pointB.x).toBeCloseTo(4);
        expect(p.pointB.y).toBeCloseTo(0);
        expect(p.pointC.x).toBeCloseTo(5.5);
        expect(p.pointC.y).toBeCloseTo(2);
        expect(p.pointD.x).toBeCloseTo(1.5);
        expect(p.pointD.y).toBeCloseTo(2);

        // Lengths
        expect(p.lengthAB).toBeCloseTo(4);
        expect(p.lengthBC).toBeCloseTo(2.5);
        expect(p.lengthCD).toBeCloseTo(4);
        expect(p.lengthDA).toBeCloseTo(2.5);
    });

    it('should create a parallelogram with given points (Point instances)', () => {
        const points = [
            new Point(4, 6),
            new Point(8, 5),
            new Point(6, 1),
            new Point(2, 2),
        ];

        const p = new Parallelogram({ points });

        expect(p.lengthAB).toBeCloseTo(Math.sqrt(17));
        expect(p.lengthBC).toBeCloseTo(Math.sqrt(20));
        expect(p.lengthCD).toBeCloseTo(Math.sqrt(17));
        expect(p.lengthDA).toBeCloseTo(Math.sqrt(20));

        // Opposite angles equal
        expect(p.angleAInRadians).toBeCloseTo(p.angleCInRadians);
        expect(p.angleBInRadians).toBeCloseTo(p.angleDInRadians);
        // Adjacent angles sum to π
        expect(p.angleAInRadians + p.angleBInRadians).toBeCloseTo(Math.PI);
    });

    it('should correctly calculate diagonals when requested (points-based)', () => {
        const points = [
            { x: 0, y: 0 },
            { x: 4, y: 0 },
            { x: 5.5, y: 2 },
            { x: 1.5, y: 2 },
        ];

        const p = new Parallelogram({ points, supplementary: { calculateDiagonals: true } });

        // Diagonal lengths
        const dAC = Math.sqrt(5.5 ** 2 + 2 ** 2); // distance A(0,0) to C(5.5,2)
        const dBD = Math.sqrt((4 - 1.5) ** 2 + (0 - 2) ** 2); // distance B(4,0) to D(1.5,2)
        expect(p.lengthDiagonalAC).toBeCloseTo(dAC);
        expect(p.lengthDiagonalBD).toBeCloseTo(dBD);

        // Diagonal endpoints
        const diagonalAC = p.diagonalAC;
        expect(diagonalAC.start.x).toBeCloseTo(p.pointA.x);
        expect(diagonalAC.start.y).toBeCloseTo(p.pointA.y);
        expect(diagonalAC.end.x).toBeCloseTo(p.pointC.x);
        expect(diagonalAC.end.y).toBeCloseTo(p.pointC.y);

        const diagonalBD = p.diagonalBD;
        expect(diagonalBD.start.x).toBeCloseTo(p.pointB.x);
        expect(diagonalBD.start.y).toBeCloseTo(p.pointB.y);
        expect(diagonalBD.end.x).toBeCloseTo(p.pointD.x);
        expect(diagonalBD.end.y).toBeCloseTo(p.pointD.y);

        // Intersection point should be the centroid (0, 0)
        const intersectionPoint = p.diagonalIntersectionPoint;
        expect(intersectionPoint.x).toBeCloseTo(0);
        expect(intersectionPoint.y).toBeCloseTo(0);
    });

    it('should correctly calculate perimeter and area (points-based)', () => {
        const points = [
            { x: 0, y: 0 },
            { x: 4, y: 0 },
            { x: 5.5, y: 2 },
            { x: 1.5, y: 2 },
        ];

        const p = new Parallelogram({ points });

        expect(p.perimeter).toBeCloseTo(2 * (4 + 2.5));
        expect(p.area()).toBeCloseTo(8); // |AB x AD| = |4*2 - 0*1.5|
    });

    it('should throw an error for invalid points (not a parallelogram)', () => {
        const invalidPoints1 = [
            { x: 0, y: 0 },
            { x: 4, y: 0 },
            { x: 6, y: 2 }, // makes CD length 5, not equal to AB
            { x: 1, y: 2 },
        ];

        expect(() => new Parallelogram({ points: invalidPoints1 })).toThrow(/do not form a parallelogram/i);

        const invalidPoints2 = [
            { x: 0, y: 0 },
            { x: 4, y: 0 },
            { x: 4.5, y: 2 },
            { x: 0, y: 2 }, // only one pair of opposite sides parallel and also mismatched lengths
        ];

        expect(() => new Parallelogram({ points: invalidPoints2 })).toThrow(/do not form a parallelogram/i);
    });
});
