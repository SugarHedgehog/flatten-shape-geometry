import Rectangle from '../src/shape/Rectangle';
import { Point } from '@flatten-js/core';
import { shiftCoordinate2D } from '../src/functions/general.js';

describe('Rectangle', () => {
    it('should create a rectangle with given width and height', () => {
        const rect = new Rectangle({ width: 4, height: 2 });
        expect(rect.lengthAB).toBe(4);
        expect(rect.lengthBC).toBe(2);
        expect(rect.lengthCD).toBe(4);
        expect(rect.lengthDA).toBe(2);
    });

    it('should have all angles equal to 90 degrees', () => {
        const rect = new Rectangle({ width: 4, height: 2 });
        expect(rect.angleAInRadians).toBeCloseTo(Math.PI / 2);
        expect(rect.angleBInRadians).toBeCloseTo(Math.PI / 2);
        expect(rect.angleCInRadians).toBeCloseTo(Math.PI / 2);
        expect(rect.angleDInRadians).toBeCloseTo(Math.PI / 2);

        expect(rect.angleAInDegrees).toBeCloseTo(90);
        expect(rect.angleBInDegrees).toBeCloseTo(90);
        expect(rect.angleCInDegrees).toBeCloseTo(90);
        expect(rect.angleDInDegrees).toBeCloseTo(90);
    });

    it('should have correct vertex coordinates', () => {
        const rect = new Rectangle({ width: 4, height: 2 });
        const expectedPoints = [
            new Point(0, 0),
            new Point(4, 0),
            new Point(4, 2),
            new Point(0, 2)
        ].map(p => shiftCoordinate2D(p, new Point(2, 1)));

        expectedPoints.forEach((point, index) => {
            const actualPoint = index === 0 ? rect.pointA :
                index === 1 ? rect.pointB :
                    index === 2 ? rect.pointC :
                        rect.pointD;
            expect(actualPoint.x).toBeCloseTo(point.x);
            expect(actualPoint.y).toBeCloseTo(point.y);
        });
    });

    it('should correctly calculate perimeter and area', () => {
        const rect = new Rectangle({ width: 4, height: 2 });
        expect(rect.perimeter).toBe(12);
        expect(rect.area()).toBe(8);
    });

    it('should correctly calculate diagonals when requested', () => {
        const rect = new Rectangle({ width: 4, height: 2 }, { calculateDiagonals: true });
        expect(rect.lengthDiagonalAC).toBeCloseTo(Math.sqrt(4**2 + 2**2));
        expect(rect.lengthDiagonalBD).toBeCloseTo(Math.sqrt(4**2 + 2**2));

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

        const intersectionPoint = rect.diagonalIntersectionPoint;
        expect(intersectionPoint.x).toBeCloseTo(0);
        expect(intersectionPoint.y).toBeCloseTo(0);
    });

    it('should throw an exception for invalid dimensions', () => {
        expect(() => new Rectangle({ width: -1, height: 2 })).toThrow(/Invalid lengths/);
        expect(() => new Rectangle({ width: 2, height: -3 })).toThrow(/Invalid lengths/);
        expect(() => new Rectangle({ width: "test", height: 2 })).toThrow(/Invalid lengths/);
        expect(() => new Rectangle({ width: 2, height: NaN })).toThrow(/Invalid lengths/);
    });
});