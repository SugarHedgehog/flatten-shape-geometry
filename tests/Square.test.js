import Square from '../src/shape/Square';
import { Point } from '@flatten-js/core';
import { shiftCoordinate2D } from '../src/functions/general.js';

describe('Square', () => {
    it('should create a square with a given length', () => {
        const square = new Square(2);
        expect(square.lengthAB).toBe(2);
        expect(square.lengthBC).toBe(2);
        expect(square.lengthCD).toBe(2);
        expect(square.lengthDA).toBe(2);
    });

    it('should have all angles equal to 90 degrees', () => {
        const square = new Square(2);
        expect(square.angleAInRadians).toBeCloseTo(Math.PI / 2);
        expect(square.angleBInRadians).toBeCloseTo(Math.PI / 2);
        expect(square.angleCInRadians).toBeCloseTo(Math.PI / 2);
        expect(square.angleDInRadians).toBeCloseTo(Math.PI / 2);

        expect(square.angleAInDegrees).toBeCloseTo(90);
        expect(square.angleBInDegrees).toBeCloseTo(90);
        expect(square.angleCInDegrees).toBeCloseTo(90);
        expect(square.angleDInDegrees).toBeCloseTo(90);
    });

    it('should have correct vertex coordinates', () => {
        const square = new Square(2);
        const expectedPoints = [
            new Point(0, 0),
            new Point(2, 0),
            new Point(2, 2),
            new Point(0, 2)
        ].map(p => shiftCoordinate2D(p, new Point(1, 1)));

        expectedPoints.forEach((point, index) => {
            const actualPoint = index === 0 ? square.pointA :
                index === 1 ? square.pointB :
                    index === 2 ? square.pointC :
                        square.pointD;
            expect(actualPoint.x).toBeCloseTo(point.x);
            expect(actualPoint.y).toBeCloseTo(point.y);
        });
    });

    it('should correctly calculate perimeter and area', () => {
        const square = new Square(2);
        expect(square.perimeter).toBe(8);
        expect(square.area()).toBe(4);
    });

    it('should correctly calculate diagonals', () => {
        const square = new Square(2, { calculateDiagonals: true });
        expect(square.lengthDiagonalAC).toBeCloseTo(2 * Math.sqrt(2));
        expect(square.lengthDiagonalBD).toBeCloseTo(2 * Math.sqrt(2));

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

    it('should throw an exception for invalid length', () => {
        expect(() => new Square(-1)).toThrow(/Invalid length/);
        expect(() => new Square("test")).toThrow(/Invalid length/);
        expect(() => new Square(NaN)).toThrow(/Invalid length/);
    });
});