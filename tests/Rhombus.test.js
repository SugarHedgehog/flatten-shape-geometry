import Rhombus from '../src/shape/Rhombus';
import { Point, Segment } from '@flatten-js/core';
import degreesToRadians from 'degrees-radians';

describe('Rhombus', () => {
    it('should create a rhombus with given length and angles', () => {
        const rhombus = new Rhombus(2, { angle: { angleA: 60 } });
        expect(rhombus.lengthAB).toBe(2);
        expect(rhombus.lengthBC).toBe(2);
        expect(rhombus.lengthCD).toBe(2);
        expect(rhombus.lengthDA).toBe(2);
    });

    it('should have correct angles in radians and degrees', () => {
        const rhombus = new Rhombus(2, { angle: { angleA: 60 }, angleInDegree: true });
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
        const rhombus = new Rhombus(2, { angle: { angleA: 60 }, angleInDegree: true });
        const d1 = 2 * 2 * Math.cos(degreesToRadians(60) / 2);
        const d2 = 2 * 2 * Math.sin(degreesToRadians(60) / 2);
        expect(rhombus.lengthDiagonalAC).toBeCloseTo(d1);
        expect(rhombus.lengthDiagonalBD).toBeCloseTo(d2);
    });

    it('should have correct vertex coordinates', () => {
        const rhombus = new Rhombus(2, { angle: { angleA: 60 }, angleInDegree: true });
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
        const rhombus = new Rhombus(2, { angle: { angleA: 60 }, angleInDegree: true });
        expect(rhombus.perimeter).toBe(8);
        expect(rhombus.area()).toBeCloseTo(2 * 2 * Math.sin(degreesToRadians(60)));
    });

    it('should throw an exception for invalid length', () => {
        expect(() => new Rhombus(-1, { angle: { angleA: 60 } })).toThrow(/Invalid length/);
        expect(() => new Rhombus("test", { angle: { angleA: 60 } })).toThrow(/Invalid length/);
        expect(() => new Rhombus(NaN, { angle: { angleA: 60 } })).toThrow(/Invalid length/);
    });

    it('should throw an exception for invalid angles', () => {
        expect(() => new Rhombus(2, {})).toThrow(/No angle of the rhombus is defined/);
        expect(() => new Rhombus(2, { angle: {} })).toThrow(/No angle of the rhombus is defined/);
        expect(() => new Rhombus(2, { angle: { angleE: 60 } })).toThrow(/Angles are not defined/);
    });
});