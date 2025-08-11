import { Point, Circle } from '@flatten-js/core';
import CircleByPoints from '../src/shape/CircleByPoints';

describe('CircleByPoints', () => {
    describe('fromCenterAndPoint', () => {
        it('should create a Circle given center and point on circumference', () => {
            const center = new Point(-1, 7);
            const point = new Point(-8, 1);
            const circle = CircleByPoints.fromCenterAndPoint(center, point);

            expect(circle).toBeInstanceOf(Circle);
            expect(circle.pc.x).toBeCloseTo(-1);
            expect(circle.pc.y).toBeCloseTo(7);
            expect(circle.r).toBeCloseTo(Math.sqrt(85));
        });

        it('should throw if center is not a Point', () => {
            expect(() => {
                CircleByPoints.fromCenterAndPoint({}, new Point(1, 2));
            }).toThrow('center must be a Point instance');
        });

        it('should throw if pointOnCircumference is not a Point', () => {
            expect(() => {
                CircleByPoints.fromCenterAndPoint(new Point(1, 2), {});
            }).toThrow('pointOnCircumference must be a Point instance');
        });
    });

    describe('fromThreePoints', () => {
        it('should create a Circle passing through three points', () => {
            const p1 = new Point(-4, 0);
            const p2 = new Point(5, 10);
            const p3 = new Point(-6, -1);

            const circle = CircleByPoints.fromThreePoints(p1, p2, p3);

            expect(circle).toBeInstanceOf(Circle);
            // Окружность через (0,0), (0,2), (2,0) имеет центр (1,1) и радиус sqrt(2)
            expect(circle.pc.x).toBeCloseTo(-14.5);
            expect(circle.pc.y).toBeCloseTo(18.5);
            expect(circle.r).toBeCloseTo(Math.sqrt(452.5));
        });

        it('should throw if any argument is not a Point', () => {
            const p = new Point(0, 0);
            expect(() => {
                CircleByPoints.fromThreePoints({}, p, p);
            }).toThrow('point1 must be a Point instance');
            expect(() => {
                CircleByPoints.fromThreePoints(p, {}, p);
            }).toThrow('point2 must be a Point instance');
            expect(() => {
                CircleByPoints.fromThreePoints(p, p, {});
            }).toThrow('point3 must be a Point instance');
        });

        it('should throw if points are collinear', () => {
            const p1 = new Point(0, 0);
            const p2 = new Point(1, 1);
            const p3 = new Point(2, 2); // collinear
            expect(() => {
                CircleByPoints.fromThreePoints(p1, p2, p3);
            }).toThrow(/collinear/i);
        });
    });
});