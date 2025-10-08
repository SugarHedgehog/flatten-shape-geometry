import Rhombus from '../src/shape/Rhombus';
import { Point, Segment } from '@flatten-js/core';
import degreesToRadians from 'degrees-radians';

describe('Rhombus', () => {
    it('should create a rhombus with given length and angles', () => {
        const rhombus = new Rhombus({ 
            length: 2, 
            angles: { 
                angle: { angleA: 60 } 
            } 
        });
        expect(rhombus.lengthAB).toBe(2);
        expect(rhombus.lengthBC).toBe(2);
        expect(rhombus.lengthCD).toBe(2);
        expect(rhombus.lengthDA).toBe(2);
    });

    it('should have correct angles in radians and degrees', () => {
        const rhombus = new Rhombus({
            length: 2,
            angles: { 
                angle: { angleA: 60 },
                angleInDegree: true 
            }
        });
        expect(rhombus.angleAInRadians).toBeCloseTo(degreesToRadians(60));
        expect(rhombus.angleBInRadians).toBeCloseTo(degreesToRadians(120));
        expect(rhombus.angleCInRadians).toBeCloseTo(degreesToRadians(60));
        expect(rhombus.angleDInRadians).toBeCloseTo(degreesToRadians(120));

        expect(rhombus.angleAInDegrees).toBeCloseTo(60);
        expect(rhombus.angleBInDegrees).toBeCloseTo(120);
        expect(rhombus.angleCInDegrees).toBeCloseTo(60);
        expect(rhombus.angleDInDegrees).toBeCloseTo(120);
    });

    it('should have correct diagonal lengths', () => {
        const rhombus = new Rhombus({
            length: 2,
            angles: { 
                angle: { angleA: 60 },
                angleInDegree: true 
            }
        });
        const d1 = 2 * 2 * Math.cos(degreesToRadians(60) / 2);
        const d2 = 2 * 2 * Math.sin(degreesToRadians(60) / 2);
        expect(rhombus.lengthDiagonalAC).toBeCloseTo(d1);
        expect(rhombus.lengthDiagonalBD).toBeCloseTo(d2);
    });

    it('should have correct vertex coordinates', () => {
        const rhombus = new Rhombus({
            length: 2,
            angles: { 
                angle: { angleA: 60 },
                angleInDegree: true 
            }
        });
        const d1 = 2 * 2 * Math.cos(degreesToRadians(60) / 2);
        const d2 = 2 * 2 * Math.sin(degreesToRadians(60) / 2);

        expect(rhombus.pointA.x).toBeCloseTo(-d1 / 2);
        expect(rhombus.pointA.y).toBeCloseTo(0);
        expect(rhombus.pointB.x).toBeCloseTo(0);
        expect(rhombus.pointB.y).toBeCloseTo(-d2 / 2);
        expect(rhombus.pointC.x).toBeCloseTo(d1 / 2);
        expect(rhombus.pointC.y).toBeCloseTo(0);
        expect(rhombus.pointD.x).toBeCloseTo(0);
        expect(rhombus.pointD.y).toBeCloseTo(d2 / 2);
    });

    it('should correctly calculate perimeter and area', () => {
        const rhombus = new Rhombus({
            length: 2,
            angles: { 
                angle: { angleA: 60 },
                angleInDegree: true 
            }
        });
        expect(rhombus.perimeter).toBe(8);
        expect(rhombus.area()).toBeCloseTo(2 * 2 * Math.sin(degreesToRadians(60)));
    });

    it('should throw an exception for invalid length', () => {
        expect(() => new Rhombus({ 
            length: -1, 
            angles: { angle: { angleA: 60 } } 
        })).toThrow(/Invalid arguments/);
        expect(() => new Rhombus({ 
            length: "test", 
            angles: { angle: { angleA: 60 } } 
        })).toThrow(/Invalid arguments/);
        expect(() => new Rhombus({ 
            length: NaN, 
            angles: { angle: { angleA: 60 } } 
        })).toThrow(/Invalid arguments/);
    });

    it('should throw an exception for invalid angles', () => {
        expect(() => new Rhombus({ 
            length: 2,
            angles: {} 
        })).toThrow(/No angle of the rhombus is defined/);
        expect(() => new Rhombus({ 
            length: 2,
            angles: { angle: {} } 
        })).toThrow(/No angle of the rhombus is defined/);
        expect(() => new Rhombus({ 
            length: 2,
            angles: { angle: { angleE: 60 } } 
        })).toThrow(/Angles are not defined/);
    });

    it('should correctly calculate all heights with proper options', () => {
        const rhombus = new Rhombus({
            length: 2,
            angles: { 
                angle: { angleA: 60 },
                angleInDegree: true 
            },
            supplementary: {
                calculateHeights: true
            }
        });
    
        const heightValue = 2 * Math.sin(degreesToRadians(60));
        
        // Check all heights
        expect(rhombus.lengthHeightABC).toBeCloseTo(heightValue);
        expect(rhombus.lengthHeightACD).toBeCloseTo(heightValue);
        expect(rhombus.lengthHeightBCD).toBeCloseTo(heightValue);
        expect(rhombus.lengthHeightBDA).toBeCloseTo(heightValue);
        expect(rhombus.lengthHeightCAB).toBeCloseTo(heightValue);
        expect(rhombus.lengthHeightCDA).toBeCloseTo(heightValue);
        expect(rhombus.lengthHeightDAB).toBeCloseTo(heightValue);
        expect(rhombus.lengthHeightDBC).toBeCloseTo(heightValue);
    });

    it('should have correct vertex coordinates with different angle and length', () => {
        const rhombus = new Rhombus({
            length: 3,
            angles: { 
                angle: { angleA: 90 }, // Прямоугольный ромб (квадрат)
                angleInDegree: true 
            }
        });
        
        // Для квадрата диагонали равны
        const d1 = 2 * 3 * Math.cos(Math.PI / 4); // 90 градусов в радианах
        const d2 = 2 * 3 * Math.sin(Math.PI / 4);
        
        expect(rhombus.pointA.x).toBeCloseTo(-d1 / 2);
        expect(rhombus.pointA.y).toBeCloseTo(0);
        expect(rhombus.pointB.x).toBeCloseTo(0);
        expect(rhombus.pointB.y).toBeCloseTo(-d2 / 2);
        expect(rhombus.pointC.x).toBeCloseTo(d1 / 2);
        expect(rhombus.pointC.y).toBeCloseTo(0);
        expect(rhombus.pointD.x).toBeCloseTo(0);
        expect(rhombus.pointD.y).toBeCloseTo(d2 / 2);
    });

    it('should have correct vertex coordinates with angle in radians', () => {
        const angleInRadians = Math.PI / 3; // 60 градусов
        const rhombus = new Rhombus({
            length: 2,
            angles: { 
                angle: { angleA: angleInRadians }
            }
        });
        
        const d1 = 2 * 2 * Math.cos(angleInRadians / 2);
        const d2 = 2 * 2 * Math.sin(angleInRadians / 2);
        
        expect(rhombus.pointA.x).toBeCloseTo(-d1 / 2);
        expect(rhombus.pointA.y).toBeCloseTo(0);
        expect(rhombus.pointB.x).toBeCloseTo(0);
        expect(rhombus.pointB.y).toBeCloseTo(-d2 / 2);
        expect(rhombus.pointC.x).toBeCloseTo(d1 / 2);
        expect(rhombus.pointC.y).toBeCloseTo(0);
        expect(rhombus.pointD.x).toBeCloseTo(0);
        expect(rhombus.pointD.y).toBeCloseTo(d2 / 2);
    });
});
