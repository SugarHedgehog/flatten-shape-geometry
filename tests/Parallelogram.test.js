import Parallelogram from '../src/shape/Parallelogram';
import { Point, Segment} from '@flatten-js/core';
import degreesToRadians from 'degrees-radians';
import { shiftCoordinate2D, perpendicular} from '../src/functions/general.js';

describe('Parallelogram', () => {
    it('should create a parallelogram with given side lengths and angles', () => {
        const parallelogram = new Parallelogram({
            lengths: { lengthAB: 4, lengthBC: 3 },
            angles: { angle: { angleA: 60 }, angleInDegree: true }
        });
        expect(parallelogram.lengthAB).toBeCloseTo(4);
        expect(parallelogram.lengthBC).toBeCloseTo(3);
        expect(parallelogram.lengthCD).toBeCloseTo(4);
        expect(parallelogram.lengthDA).toBeCloseTo(3);
    });

    it('should have correct angles in radians and degrees', () => {
        const parallelogram = new Parallelogram({lengths:{ lengthAB: 4, lengthBC: 3 }, angles:{ angle: { angleA: 60 }, angleInDegree: true }});
        expect(parallelogram.angleAInRadians).toBeCloseTo(degreesToRadians(60));
        expect(parallelogram.angleBInRadians).toBeCloseTo(degreesToRadians(120));
        expect(parallelogram.angleCInRadians).toBeCloseTo(degreesToRadians(60));
        expect(parallelogram.angleDInRadians).toBeCloseTo(degreesToRadians(120));

        expect(parallelogram.angleAInDegrees).toBeCloseTo(60);
        expect(parallelogram.angleBInDegrees).toBeCloseTo(120);
        expect(parallelogram.angleCInDegrees).toBeCloseTo(60);
        expect(parallelogram.angleDInDegrees).toBeCloseTo(120);
    });

    it('should have correct vertex coordinates', () => {
        const parallelogram = new Parallelogram({
            lengths: { lengthAB: 4, lengthBC: 3 },
            angles: { angle: { angleA: 60 }, angleInDegree: true }
        });
        const x = 3 * Math.cos(degreesToRadians(60));
        const y = 3 * Math.sin(degreesToRadians(60));

        const expectedPoints = [
            new Point(0, 0),
            new Point(4, 0),
            new Point(4 + x, y),
            new Point(x, y)
        ].map(p => shiftCoordinate2D(p, new Point(2 + x/2, y/2)));

        expectedPoints.forEach((point, index) => {
            const actualPoint = index === 0 ? parallelogram.pointA :
                index === 1 ? parallelogram.pointB :
                    index === 2 ? parallelogram.pointC :
                        parallelogram.pointD;
            expect(actualPoint.x).toBeCloseTo(point.x);
            expect(actualPoint.y).toBeCloseTo(point.y);
        });
    });

    it('should correctly calculate perimeter and area', () => {
        const parallelogram = new Parallelogram({
            lengths: { lengthAB: 4, lengthBC: 3 },
            angles: { angle: { angleA: 60 }, angleInDegree: true }
        });
        expect(parallelogram.perimeter).toBe(14);
        expect(parallelogram.area()).toBeCloseTo(4 * 3 * Math.sin(degreesToRadians(60)));
    });

    it('should correctly calculate diagonals when requested', () => {
        const parallelogram = new Parallelogram({
            lengths: { lengthAB: 4, lengthBC: 3 },
            angles: { angle: { angleA: 60 }, angleInDegree: true },
            supplementary: { calculateDiagonals: true }
        });
        const d1 = Math.sqrt(4**2 + 3**2 + 2*4*3*Math.cos(degreesToRadians(60)));
        const d2 = Math.sqrt(4**2 + 3**2 - 2*4*3*Math.cos(degreesToRadians(60)));

        expect(parallelogram.lengthDiagonalAC).toBeCloseTo(d1);
        expect(parallelogram.lengthDiagonalBD).toBeCloseTo(d2);

        const diagonalAC = parallelogram.diagonalAC;
        expect(diagonalAC.start.x).toBeCloseTo(parallelogram.pointA.x);
        expect(diagonalAC.start.y).toBeCloseTo(parallelogram.pointA.y);
        expect(diagonalAC.end.x).toBeCloseTo(parallelogram.pointC.x);
        expect(diagonalAC.end.y).toBeCloseTo(parallelogram.pointC.y);

        const diagonalBD = parallelogram.diagonalBD;
        expect(diagonalBD.start.x).toBeCloseTo(parallelogram.pointB.x);
        expect(diagonalBD.start.y).toBeCloseTo(parallelogram.pointB.y);
        expect(diagonalBD.end.x).toBeCloseTo(parallelogram.pointD.x);
        expect(diagonalBD.end.y).toBeCloseTo(parallelogram.pointD.y);

        const intersectionPoint = parallelogram.diagonalIntersectionPoint;
        expect(intersectionPoint.x).toBeCloseTo(0);
        expect(intersectionPoint.y).toBeCloseTo(0);
    });

    it('should throw an exception for invalid lengths', () => {
        expect(() => new Parallelogram({})).toThrow(/Invalid arguments/);
        expect(() => new Parallelogram({
            lengths: { lengthAB: -1, lengthBC: 2 },
            angles: { angle: { angleA: 60 } }
        })).toThrow(/Length isn't a positive numeric value/);
        expect(() => new Parallelogram({
            lengths: { lengthAB: "test", lengthBC: 2 },
            angles: { angle: { angleA: 60 } }
        })).toThrow(/Length isn't a positive numeric value/);
        expect(() => new Parallelogram({
            lengths: { lengthAB: 2, lengthCD: 3 },
            angles: { angle: { angleA: 60 } }
        })).toThrow(/Two parallel sides of a parallelogram are given/);
    });

    it('should throw an exception for invalid angles', () => {
        expect(() => new Parallelogram({
            lengths: { lengthAB: 4, lengthBC: 3 }
        })).toThrow(/No angle of the parallelogram is defined/);
        expect(() => new Parallelogram({
            lengths: { lengthAB: 4, lengthBC: 3 },
            angles: { angle: {} }
        })).toThrow(/No angle of the parallelogram is defined/);
        expect(() => new Parallelogram({
            lengths: { lengthAB: 4, lengthBC: 3 },
            angles: { angle: { angleE: 60 } }
        })).toThrow(/Angles aren't defined/);
    });

    it('should correctly calculate heights when requested', () => {
        const parallelogram = new Parallelogram({
            lengths: { lengthAB: 8, lengthBC: 6.3245553203368 },
            angles: { angle: { angleA: 71.565051177078 }, angleInDegree: true },
            supplementary: { calculateHeights: true }
        });

        const h1 = perpendicular(new Point(0,0), new Segment(new Point(8,0), new Point(10,6)))[0];
        const h2 = perpendicular(new Point(0,0), new Segment(new Point(2,6), new Point(10,6)))[0];

        // Height from A to BC
        expect(parallelogram.lengthHeightABC).toBeCloseTo(h1);
        
         // Height from A to CD
        expect(parallelogram.lengthHeightACD).toBeCloseTo(h2);

        // Height from B to CD
        expect(parallelogram.lengthHeightBCD).toBeCloseTo(h2);

        // Height from B to DA
        expect(parallelogram.lengthHeightBDA).toBeCloseTo(h1);

        // Height from C to AB
        expect(parallelogram.lengthHeightCAB).toBeCloseTo(h2);

        // Height from C to DA
        expect(parallelogram.lengthHeightCDA).toBeCloseTo(h1);

        // Height from D to AB
        expect(parallelogram.lengthHeightDAB).toBeCloseTo(h2);

        // Height from D to BC
        expect(parallelogram.lengthHeightDBC).toBeCloseTo(h1);
    });
});