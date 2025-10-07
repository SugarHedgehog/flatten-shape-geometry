import Rectangle from '../src/shape/Rectangle';
import { Point } from '@flatten-js/core';

describe('Rectangle (by points)', () => {
    it('should create a rectangle with given points (plain objects)', () => {
        const points = [
            { x: 0, y: 0 },
            { x: 4, y: 0 },
            { x: 4, y: 2 },
            { x: 0, y: 2 },
        ];

        const rect = new Rectangle({ points });

        // Lengths
        expect(rect.lengthAB).toBeCloseTo(4);
        expect(rect.lengthBC).toBeCloseTo(2);
        expect(rect.lengthCD).toBeCloseTo(4);
        expect(rect.lengthDA).toBeCloseTo(2);

        // Angles (90 degrees)
        expect(rect.angleAInRadians).toBeCloseTo(Math.PI / 2);
        expect(rect.angleBInRadians).toBeCloseTo(Math.PI / 2);
        expect(rect.angleCInRadians).toBeCloseTo(Math.PI / 2);
        expect(rect.angleDInRadians).toBeCloseTo(Math.PI / 2);

        expect(rect.angleAInDegrees).toBeCloseTo(90);
        expect(rect.angleBInDegrees).toBeCloseTo(90);
        expect(rect.angleCInDegrees).toBeCloseTo(90);
        expect(rect.angleDInDegrees).toBeCloseTo(90);

    });
    
    it('should create a rectangle with given points (plain objects) with shiftCoordinate = false', () => {
        const points = [
            { x: 0, y: 0 },
            { x: 4, y: 0 },
            { x: 4, y: 2 },
            { x: 0, y: 2 },
        ];

        const rect = new Rectangle({ points, supplementary: { shiftCoordinate: false } });
        
        expect(rect.pointA.x).toBeCloseTo(0);
        expect(rect.pointA.y).toBeCloseTo(0);
        expect(rect.pointB.x).toBeCloseTo(4);
        expect(rect.pointB.y).toBeCloseTo(0);
        expect(rect.pointC.x).toBeCloseTo(4);
        expect(rect.pointC.y).toBeCloseTo(2);
        expect(rect.pointD.x).toBeCloseTo(0);
        expect(rect.pointD.y).toBeCloseTo(2);

        // Lengths
        expect(rect.lengthAB).toBeCloseTo(4);
        expect(rect.lengthBC).toBeCloseTo(2);
        expect(rect.lengthCD).toBeCloseTo(4);
        expect(rect.lengthDA).toBeCloseTo(2);

        // Angles (90 degrees)
        expect(rect.angleAInRadians).toBeCloseTo(Math.PI / 2);
        expect(rect.angleBInRadians).toBeCloseTo(Math.PI / 2);
        expect(rect.angleCInRadians).toBeCloseTo(Math.PI / 2);
        expect(rect.angleDInRadians).toBeCloseTo(Math.PI / 2);

        expect(rect.angleAInDegrees).toBeCloseTo(90);
        expect(rect.angleBInDegrees).toBeCloseTo(90);
        expect(rect.angleCInDegrees).toBeCloseTo(90);
        expect(rect.angleDInDegrees).toBeCloseTo(90);

    });

    it('should create a rectangle with given points (Point instances)', () => {
        const points = [
            new Point(4, 6),
            new Point(6, 4),
            new Point(3, 1),
            new Point(1, 3),
        ];

        const rect = new Rectangle({ points });

        expect(rect.lengthAB).toBeCloseTo(2.828);
        expect(rect.lengthBC).toBeCloseTo(4.242);
        expect(rect.lengthCD).toBeCloseTo(2.828);
        expect(rect.lengthDA).toBeCloseTo(4.242);
        
        // Angles (90 degrees)
        expect(rect.angleAInRadians).toBeCloseTo(Math.PI / 2);
        expect(rect.angleBInRadians).toBeCloseTo(Math.PI / 2);
        expect(rect.angleCInRadians).toBeCloseTo(Math.PI / 2);
        expect(rect.angleDInRadians).toBeCloseTo(Math.PI / 2);

        expect(rect.angleAInDegrees).toBeCloseTo(90);
        expect(rect.angleBInDegrees).toBeCloseTo(90);
        expect(rect.angleCInDegrees).toBeCloseTo(90);
        expect(rect.angleDInDegrees).toBeCloseTo(90);
    });

    it('should correctly calculate diagonals when requested (points-based)', () => {
        const points = [
            new Point(0, 0),
            new Point(4, 0),
            new Point(4, 2),
            new Point(0, 2),
        ];

        const rect = new Rectangle({ points, supplementary: { calculateDiagonals: true } });

        // Diagonal lengths
        const diag = Math.sqrt(4 ** 2 + 2 ** 2);
        expect(rect.lengthDiagonalAC).toBeCloseTo(diag);
        expect(rect.lengthDiagonalBD).toBeCloseTo(diag);

        // Diagonal endpoints
        const diagonalAC = rect.diagonalAC;
        expect(diagonalAC.start.x).toBeCloseTo(rect.pointA.x);
        expect(diagonalAC.start.y).toBeCloseTo(rect.pointA.y);
        expect(diagonalAC.end.x).toBeCloseTo(rect.pointC.x);
        expect(diagonalAC.end.y).toBeCloseTo(rect.pointC.y);

        const diagonalBD = rect.diagonalBD;
        expect(diagonalBD.start.x).toBeCloseTo(rect.pointB.x);
        expect(diagonalBD.start.y).toBeCloseTo(rect.pointB.y);
        expect(diagonalBD.end.x).toBeCloseTo(rect.pointD.x);
        expect(diagonalBD.end.y).toBeCloseTo(rect.pointD.y);

        // Intersection point should be the centroid (0, 0)
        const intersectionPoint = rect.diagonalIntersectionPoint;
        expect(intersectionPoint.x).toBeCloseTo(0);
        expect(intersectionPoint.y).toBeCloseTo(0);
    });

    it('should correctly calculate perimeter and area (points-based)', () => {
        const points = [
            new Point(0, 0),
            new Point(4, 0),
            new Point(4, 2),
            new Point(0, 2),
        ];

        const rect = new Rectangle({ points });

        expect(rect.perimeter).toBeCloseTo(12);
        expect(rect.area()).toBeCloseTo(8);
    });

    it('should throw an error for invalid points (not a rectangle)', () => {
        // A general parallelogram that is not a rectangle
        const invalidPoints = [
            { x: 0, y: 0 },
            { x: 4, y: 0 },
            { x: 5, y: 2 },
            { x: 1, y: 2 },
        ];

        expect(() => new Rectangle({ points: invalidPoints })).toThrow(/do not form a rectangle/i);
    });
});
