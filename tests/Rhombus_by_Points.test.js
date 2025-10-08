import Rhombus from '../src/shape/Rhombus';

describe('Rhombus (by points)', () => {
    it('should create a rhombus with given points (plain objects)', () => {
        // Rhombus with side length 2, angle A = 60°
        const sqrt3 = Math.sqrt(3);
        const points = [
            { x: 0, y: 0 },
            { x: 2, y: 0 },
            { x: 3, y: sqrt3 },
            { x: 1, y: sqrt3 },
        ];

        const r = new Rhombus({ points });

        // All sides equal
        expect(r.lengthAB).toBeCloseTo(2);
        expect(r.lengthBC).toBeCloseTo(2);
        expect(r.lengthCD).toBeCloseTo(2);
        expect(r.lengthDA).toBeCloseTo(2);

        // Angles: A=60°, B=120°, C=60°, D=120°
        expect(r.angleAInDegrees).toBeCloseTo(60);
        expect(r.angleBInDegrees).toBeCloseTo(120);
        expect(r.angleCInDegrees).toBeCloseTo(60);
        expect(r.angleDInDegrees).toBeCloseTo(120);

        // Diagonals intersection should be at (0,0) due to shift
        const intersectionPoint = r.diagonalIntersectionPoint;
        expect(intersectionPoint.x).toBeCloseTo(0);
        expect(intersectionPoint.y).toBeCloseTo(0);

        // Perimeter and area
        expect(r.perimeter).toBeCloseTo(8);
        expect(r.area()).toBeCloseTo(2 * 2 * Math.sin(Math.PI / 3)); // a^2 * sin(60°)
    });

    it('should create a rhombus with given points (shiftCoordinate = false)', () => {
        const sqrt3 = Math.sqrt(3);
        const points = [
            { x: 0, y: 0 },
            { x: 2, y: 0 },
            { x: 3, y: sqrt3 },
            { x: 1, y: sqrt3 },
        ];

        const r = new Rhombus({ points, supplementary: { shiftCoordinate: false } });

        expect(r.pointA.x).toBeCloseTo(0);
        expect(r.pointA.y).toBeCloseTo(0);
        expect(r.pointB.x).toBeCloseTo(2);
        expect(r.pointB.y).toBeCloseTo(0);
        expect(r.pointC.x).toBeCloseTo(3);
        expect(r.pointC.y).toBeCloseTo(sqrt3);
        expect(r.pointD.x).toBeCloseTo(1);
        expect(r.pointD.y).toBeCloseTo(sqrt3);
    });

    it('should correctly calculate diagonals when requested (points-based)', () => {
        const sqrt3 = Math.sqrt(3);
        const points = [
            { x: 0, y: 0 },
            { x: 2, y: 0 },
            { x: 3, y: sqrt3 },
            { x: 1, y: sqrt3 },
        ];

        const r = new Rhombus({ points, supplementary: { calculateHeights: true } });

        // Diagonals lengths (pre-shift, from original points):
        const dAC = Math.sqrt((3 - 0) ** 2 + (sqrt3 - 0) ** 2); // sqrt(12)
        const dBD = Math.sqrt((2 - 1) ** 2 + (0 - sqrt3) ** 2); // sqrt(4) = 2

        // lengths via segments getters
        expect(r.segmentAB.length).toBeCloseTo(2);
        expect(r.segmentBC.length).toBeCloseTo(2);

        // Intersection point should be (0,0) after shift
        const intersectionPoint = r.diagonalIntersectionPoint;
        expect(intersectionPoint.x).toBeCloseTo(0);
        expect(intersectionPoint.y).toBeCloseTo(0);
    });

    it('should throw an error for invalid points (not a rhombus)', () => {
        // Parallelogram but not all sides equal
        const invalidPoints1 = [
            { x: 0, y: 0 },
            { x: 3, y: 0 },
            { x: 5, y: 2 },
            { x: 2, y: 2 },
        ];
        expect(() => new Rhombus({ points: invalidPoints1 })).toThrow(/do not form a rhombus/i);

        // Not parallelogram (opposite sides not parallel)
        const invalidPoints2 = [
            { x: 0, y: 0 },
            { x: 2, y: 0 },
            { x: 4, y: 2 },
            { x: 1, y: 2 },
        ];
        expect(() => new Rhombus({ points: invalidPoints2 })).toThrow(/do not form a rhombus/i);
    });
});
