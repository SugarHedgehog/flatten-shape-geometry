import Square from '../src/shape/Square';
import { Point } from '@flatten-js/core';

describe('Square (by points)', () => {
    it('should create a square with given points (plain objects)', () => {
        const points = [
            { x: 0, y: 0 },
            { x: 2, y: 0 },
            { x: 2, y: 2 },
            { x: 0, y: 2 },
        ];

        const square = new Square({ points });

        // Lengths
        expect(square.lengthAB).toBeCloseTo(2);
        expect(square.lengthBC).toBeCloseTo(2);
        expect(square.lengthCD).toBeCloseTo(2);
        expect(square.lengthDA).toBeCloseTo(2);

        // Angles (90 degrees)
        expect(square.angleAInRadians).toBeCloseTo(Math.PI / 2);
        expect(square.angleBInRadians).toBeCloseTo(Math.PI / 2);
        expect(square.angleCInRadians).toBeCloseTo(Math.PI / 2);
        expect(square.angleDInRadians).toBeCloseTo(Math.PI / 2);

        expect(square.angleAInDegrees).toBeCloseTo(90);
        expect(square.angleBInDegrees).toBeCloseTo(90);
        expect(square.angleCInDegrees).toBeCloseTo(90);
        expect(square.angleDInDegrees).toBeCloseTo(90);

        // Intersection of diagonals -> (0,0) due to shift
        const intersectionPoint = square.diagonalIntersectionPoint;
        expect(intersectionPoint.x).toBeCloseTo(0);
        expect(intersectionPoint.y).toBeCloseTo(0);
    });

    it('should create a square with given points (Point instances)', () => {
        const points = [
            new Point(1, 1),
            new Point(3, 1),
            new Point(3, 3),
            new Point(1, 3),
        ];

        const square = new Square({ points });

        expect(square.lengthAB).toBeCloseTo(2);
        expect(square.lengthBC).toBeCloseTo(2);
        expect(square.lengthCD).toBeCloseTo(2);
        expect(square.lengthDA).toBeCloseTo(2);

        expect(square.angleAInDegrees).toBeCloseTo(90);
        expect(square.angleBInDegrees).toBeCloseTo(90);
        expect(square.angleCInDegrees).toBeCloseTo(90);
        expect(square.angleDInDegrees).toBeCloseTo(90);
    });

    it('should create a square with given points and shiftCoordinate = false', () => {
        const points = [
            { x: 0, y: 0 },
            { x: 2, y: 0 },
            { x: 2, y: 2 },
            { x: 0, y: 2 },
        ];

        const square = new Square({ points, supplementary: { shiftCoordinate: false } });

        expect(square.pointA.x).toBeCloseTo(0);
        expect(square.pointA.y).toBeCloseTo(0);
        expect(square.pointB.x).toBeCloseTo(2);
        expect(square.pointB.y).toBeCloseTo(0);
        expect(square.pointC.x).toBeCloseTo(2);
        expect(square.pointC.y).toBeCloseTo(2);
        expect(square.pointD.x).toBeCloseTo(0);
        expect(square.pointD.y).toBeCloseTo(2);
    });

    it('should correctly calculate diagonals when requested (points-based)', () => {
        const points = [
            { x: 0, y: 0 },
            { x: 2, y: 0 },
            { x: 2, y: 2 },
            { x: 0, y: 2 },
        ];

        const square = new Square({ points, supplementary: { calculateDiagonals: true } });

        const diag = Math.sqrt(2 ** 2 + 2 ** 2);
        expect(square.lengthDiagonalAC).toBeCloseTo(diag);
        expect(square.lengthDiagonalBD).toBeCloseTo(diag);

        const diagonalAC = square.diagonalAC;
        expect(diagonalAC.start.x).toBeCloseTo(square.pointA.x);
        expect(diagonalAC.start.y).toBeCloseTo(square.pointA.y);
        expect(diagonalAC.end.x).toBeCloseTo(square.pointC.x);
        expect(diagonalAC.end.y).toBeCloseTo(square.pointC.y);

        const diagonalBD = square.diagonalBD;
        expect(diagonalBD.start.x).toBeCloseTo(square.pointB.x);
        expect(diagonalBD.start.y).toBeCloseTo(square.pointB.y);
        expect(diagonalBD.end.x).toBeCloseTo(square.pointD.x);
        expect(diagonalBD.end.y).toBeCloseTo(square.pointD.y);

        const intersectionPoint = square.diagonalIntersectionPoint;
        expect(intersectionPoint.x).toBeCloseTo(0);
        expect(intersectionPoint.y).toBeCloseTo(0);
    });

    it('should correctly calculate perimeter and area (points-based)', () => {
        const points = [
            { x: 0, y: 0 },
            { x: 2, y: 0 },
            { x: 2, y: 2 },
            { x: 0, y: 2 },
        ];

        const square = new Square({ points });

        expect(square.perimeter).toBeCloseTo(8);
        expect(square.area()).toBeCloseTo(4);
    });

    it('should throw an error for invalid points (not a square): unequal sides', () => {
        const invalidPoints = [
            { x: 0, y: 0 },
            { x: 3, y: 0 }, // AB = 3
            { x: 2, y: 2 }, // BC != AB
            { x: 0, y: 2 },
        ];
        expect(() => new Square({ points: invalidPoints })).toThrow(/do not form a square/i);
    });

    it('should throw an error for invalid points (not a square): not right angles', () => {
        const invalidPoints = [
            { x: 0, y: 0 },
            { x: 2, y: 0 },
            { x: 3, y: 2 },
            { x: 1, y: 2 },
        ];
        expect(() => new Square({ points: invalidPoints })).toThrow(/do not form a square/i);
    });
});
