import Triangle from '../src/shape/Triangle';

describe('Triangle Class', () => {

    describe('Instantiation with two sides and angle between them', () => {

        let triangle;

        const lengths = {
            lengthAB: 3,
            lengthBC: 4
        };

        const angles = {
            angle: 90,
            angleInDegree: true
        };

        const supplementary = {
            calculateMedians: true,
            calculateHeights: true,
            calculateBisectors: true,
            calculateMidlines: true

        };

        beforeEach(() => {
            triangle = new Triangle({ lengths, angles, supplementary });
        });

        test('should create a triangle with the given sides and angle', () => {
            expect(triangle.lengthAB).toBeCloseTo(3);
            expect(triangle.lengthBC).toBeCloseTo(4);
            expect(triangle.lengthCA).toBeCloseTo(5);
        });

        test('should calculate the correct angles in degrees', () => {
            expect(triangle.angleAInDegrees).toBeCloseTo(53.13, 1);
            expect(triangle.angleBInDegrees).toBeCloseTo(90);
            expect(triangle.angleCInDegrees).toBeCloseTo(36.87, 1);
        });

        test('should calculate the correct perimeter', () => {
            expect(triangle.perimeter).toBeCloseTo(12);
        });

        test('should calculate the correct area', () => {
            const area = (triangle.lengthAB * triangle.lengthBC * Math.sin(Math.PI / 2)) / 2;
            expect(triangle.area()).toBeCloseTo(area);
        });

        test('should return correct median lengths', () => {
            expect(triangle.medianALength).toBeCloseTo(3.6055);
            expect(triangle.medianBLength).toBeCloseTo(2.5);
            expect(triangle.medianCLength).toBeCloseTo(4.272);
        });

        test('should return correct height lengths', () => {
            expect(triangle.heightALength).toBeCloseTo(3);
            expect(triangle.heightBLength).toBeCloseTo(2.4);
            expect(triangle.heightCLength).toBeCloseTo(4);

        });

        test('should return correct bisector lengths', () => {
            expect(triangle.bisectorALength).toBeCloseTo(3.354);
            expect(triangle.bisectorBLength).toBeCloseTo(2.424);
            expect(triangle.bisectorCLength).toBeCloseTo(4.216);
        });

        test('should return correct midline lengths', () => {
            expect(triangle.midlineABLength).toBeCloseTo(1.5);
            expect(triangle.midlineBCLength).toBeCloseTo(2);
            expect(triangle.midlineCALength).toBeCloseTo(2.5);
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
            expect(triangle.ctgA).toBeCloseTo(1 / Math.tan(triangle.angleAInRadians));
        });

        test('should return correct trigonometric values about angle B', () => {
            expect(triangle.sinB).toBeCloseTo(Math.sin(triangle.angleBInRadians));
            expect(triangle.cosB).toBeCloseTo(Math.cos(triangle.angleBInRadians));
            expect(triangle.tgB).toBeCloseTo(Math.tan(triangle.angleBInRadians));
            expect(triangle.ctgB).toBeCloseTo(1 / Math.tan(triangle.angleBInRadians));
        });

        test('should return correct trigonometric values about angle C', () => {
            expect(triangle.sinC).toBeCloseTo(Math.sin(triangle.angleCInRadians));
            expect(triangle.cosC).toBeCloseTo(Math.cos(triangle.angleCInRadians));
            expect(triangle.tgC).toBeCloseTo(Math.tan(triangle.angleCInRadians));
            expect(triangle.ctgC).toBeCloseTo(1 / Math.tan(triangle.angleCInRadians));
        });
    });
});
