import { Point } from '@flatten-js/core';
import Triangle from '../src/shape/Triangle';

describe('Triangle Class', () => {
    describe('Instantiation with three points', () => {
        let triangle;
        const pointA = { x: 0, y: 0 };
        const pointB = { x: 3, y: 0 };
        const pointC = { x: 0, y: 4 };

        let supplementary = {
            calculateMedians: true,
            calculateHeights: true,
            calculateBisectors: true,
            calculateMidlines: true
        };

        beforeEach(() => {
            triangle = new Triangle({ points: [pointA, pointB, pointC] , supplementary});
        });

        test('should create a triangle with the given points', () => {
            expect(triangle.pointA).toEqual([new Point(-1.5, -2)]);
            expect(triangle.pointB).toEqual([new Point(1.5, -2)]);
            expect(triangle.pointC).toEqual([new Point(-1.5, 2)]);
        });

        test('should calculate the correct side lengths', () => {
            expect(triangle.lengthAB).toBeCloseTo(3);
            expect(triangle.lengthBC).toBeCloseTo(5);
            expect(triangle.lengthCA).toBeCloseTo(4);
        });

        test('should calculate the correct angles in degrees', () => {
            expect(triangle.angleAInDegrees).toBeCloseTo(90);
            expect(triangle.angleBInDegrees).toBeCloseTo(53.13, 1);
            expect(triangle.angleCInDegrees).toBeCloseTo(36.87, 1);
        });

        test('should calculate the correct perimeter', () => {
            expect(triangle.perimeter).toBeCloseTo(12);
        });

        test('should calculate the correct area', () => {
            const area = (triangle.lengthAB * triangle.lengthCA) / 2;
            expect(triangle.area()).toBeCloseTo(area);
        });

        test('should return correct median lengths', () => {
            expect(triangle.medianALength).toBeCloseTo(2.5);
            expect(triangle.medianBLength).toBeCloseTo(3.6055);
            expect(triangle.medianCLength).toBeCloseTo(4.272);
        });

        test('should return correct height lengths', () => {
            expect(triangle.heightALength).toBeCloseTo(2.4);
            expect(triangle.heightBLength).toBeCloseTo(3);
            expect(triangle.heightCLength).toBeCloseTo(4);
        });

        test('should return correct bisector lengths', () => {
            expect(triangle.bisectorALength).toBeCloseTo(2.424);
            expect(triangle.bisectorBLength).toBeCloseTo(3.354);
            expect(triangle.bisectorCLength).toBeCloseTo(4.216);
        });

        test('should return correct midline lengths', () => {
            expect(triangle.midlineABLength).toBeCloseTo(1.5);
            expect(triangle.midlineBCLength).toBeCloseTo(2.5);
            expect(triangle.midlineCALength).toBeCloseTo(2);
        });

        test('should return correct radius of circumscribed circle', () => {
            expect(triangle.radiusOfCircumscribedCircle).toBeCloseTo(2.5);
        });

        test('should return correct radius of inscribed circle', () => {
            expect(triangle.radiusOfInscribedCircle).toBeCloseTo(1);
        });

        test('should return correct trigonometric values about angle A', () => {
            expect(triangle.sinA).toBeCloseTo(Math.sin(triangle.angleAInRadians));
            expect(triangle.cosA).toBeCloseTo(Math.cos(triangle.angleAInRadians));
            expect(triangle.tgA).toBeCloseTo(Math.tan(triangle.angleAInRadians));
            expect(triangle.ctgA).toBeCloseTo(1/Math.tan(triangle.angleAInRadians));
        });

        test('should return correct trigonometric values about angle B', () => {
            expect(triangle.sinB).toBeCloseTo(Math.sin(triangle.angleBInRadians));
            expect(triangle.cosB).toBeCloseTo(Math.cos(triangle.angleBInRadians));
            expect(triangle.tgB).toBeCloseTo(Math.tan(triangle.angleBInRadians));
            expect(triangle.ctgB).toBeCloseTo(1/Math.tan(triangle.angleBInRadians));
        });

        test('should return correct trigonometric values about angle C', () => {
            expect(triangle.sinC).toBeCloseTo(Math.sin(triangle.angleCInRadians));
            expect(triangle.cosC).toBeCloseTo(Math.cos(triangle.angleCInRadians));
            expect(triangle.tgC).toBeCloseTo(Math.tan(triangle.angleCInRadians));
            expect(triangle.ctgC).toBeCloseTo(1/Math.tan(triangle.angleCInRadians));
        });
    });
});