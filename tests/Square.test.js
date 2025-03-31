import Square from '../src/shape/Square';
import { Point } from '@flatten-js/core';
import { shiftCoordinate2D } from '../src/functions/general.js';

describe('Square', () => {
    const defaultLength = 2;
    
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('Constructor', () => {
        it('should create a square with a given length', () => {
            const square = new Square({ 
                length: defaultLength 
            });
            
            expect(square.lengthAB).toBe(defaultLength);
            expect(square.lengthBC).toBe(defaultLength);
            expect(square.lengthCD).toBe(defaultLength);
            expect(square.lengthDA).toBe(defaultLength);
        });

        it('should throw an exception for invalid length', () => {
            expect(() => new Square({ length: -1 })).toThrow(/Invalid length/);
            expect(() => new Square({ length: "test" })).toThrow(/Invalid length/);
            expect(() => new Square({ length: NaN })).toThrow(/Invalid length/);
        });

        it('should throw an exception if length is missing', () => {
            expect(() => new Square({})).toThrow(/Invalid length/);
        });
    });

    describe('Angles', () => {
        it('should have all angles equal to 90 degrees', () => {
            const square = new Square({ 
                length: defaultLength 
            });
            
            expect(square.angleAInRadians).toBeCloseTo(Math.PI / 2);
            expect(square.angleBInRadians).toBeCloseTo(Math.PI / 2);
            expect(square.angleCInRadians).toBeCloseTo(Math.PI / 2);
            expect(square.angleDInRadians).toBeCloseTo(Math.PI / 2);

            expect(square.angleAInDegrees).toBeCloseTo(90);
            expect(square.angleBInDegrees).toBeCloseTo(90);
            expect(square.angleCInDegrees).toBeCloseTo(90);
            expect(square.angleDInDegrees).toBeCloseTo(90);
        });
    });

    describe('Coordinates', () => {
        it('should have correct vertex coordinates', () => {
            const square = new Square({ 
                length: defaultLength 
            });
            
            const expectedPoints = [
                new Point(0, 0),
                new Point(defaultLength, 0),
                new Point(defaultLength, defaultLength),
                new Point(0, defaultLength)
            ].map(p => shiftCoordinate2D(p, new Point(defaultLength / 2, defaultLength / 2)));

            expectedPoints.forEach((point, index) => {
                const actualPoint = index === 0 ? square.pointA :
                    index === 1 ? square.pointB :
                        index === 2 ? square.pointC :
                            square.pointD;
                expect(actualPoint.x).toBeCloseTo(point.x);
                expect(actualPoint.y).toBeCloseTo(point.y);
            });
        });
    });

    describe('Diagonals', () => {
        it('should correctly calculate diagonals when requested', () => {
            const square = new Square({ 
                length: defaultLength,
                supplementary: { calculateDiagonals: true }
            });
            
            expect(square.lengthDiagonalAC).toBeCloseTo(defaultLength * Math.sqrt(2));
            expect(square.lengthDiagonalBD).toBeCloseTo(defaultLength * Math.sqrt(2));

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
    });

    describe('Properties', () => {
        it('should correctly calculate perimeter and area', () => {
            const square = new Square({ 
                length: defaultLength 
            });
            
            expect(square.perimeter).toBe(defaultLength * 4);
            expect(square.area()).toBe(Math.pow(defaultLength, 2));
        });
    });
});
