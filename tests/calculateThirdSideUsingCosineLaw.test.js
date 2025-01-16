import { calculateThirdSideUsingCosineLaw } from '../src/functions/general.js';

describe('calculateThirdSideUsingCosineLaw', () => {
    test('calculates the third side of a triangle given two sides and the included angle', () => {
        const a = 5;
        const b = 7;
        const angle = Math.PI / 3; // 60 degrees
        const expected = Math.sqrt(5 * 5 + 7 * 7 - 2 * 5 * 7 * Math.cos(angle));
        expect(calculateThirdSideUsingCosineLaw(a, b, angle)).toBeCloseTo(expected);
    });

    test('returns correct result for right angle (90 degrees)', () => {
        const a = 3;
        const b = 4;
        const angle = Math.PI / 2; // 90 degrees
        const expected = 5; // 3-4-5 triangle
        expect(calculateThirdSideUsingCosineLaw(a, b, angle)).toBeCloseTo(expected);
    });

    test('returns correct result for zero angle', () => {
        const a = 5;
        const b = 5;
        const angle = 0;
        const expected = 0; // sides overlap
        expect(calculateThirdSideUsingCosineLaw(a, b, angle)).toBeCloseTo(expected);
    });

    test('throws error for negative side lengths', () => {
        expect(() => calculateThirdSideUsingCosineLaw(-5, 7, Math.PI / 3)).toThrow('Side length "a" must be non-negative');
        expect(() => calculateThirdSideUsingCosineLaw(5, -7, Math.PI / 3)).toThrow('Side length "b" must be non-negative');
    });

    test('throws error for invalid angle', () => {
        expect(() => calculateThirdSideUsingCosineLaw(5, 7, -1)).toThrow('Angle must be between 0 and π radians');
        expect(() => calculateThirdSideUsingCosineLaw(5, 7, Math.PI + 0.1)).toThrow('Angle must be between 0 and π radians');
    });

    test('calculates correctly for boundary angle values', () => {
        const a = 5;
        const b = 5;
        const angleZero = 0;
        const anglePi = Math.PI;
        expect(calculateThirdSideUsingCosineLaw(a, b, angleZero)).toBeCloseTo(0);
        expect(calculateThirdSideUsingCosineLaw(a, b, anglePi)).toBeCloseTo(10);
    });

    test('handles very small and very large side lengths', () => {
        const smallA = 0.0001;
        const smallB = 0.0001;
        const largeA = 1e6;
        const largeB = 1e6;
        const angle = Math.PI / 4;
        expect(calculateThirdSideUsingCosineLaw(smallA, smallB, angle)).toBeCloseTo(Math.sqrt(2 * smallA * smallA * (1 - Math.cos(angle))));
        expect(calculateThirdSideUsingCosineLaw(largeA, largeB, angle)).toBeCloseTo(Math.sqrt(2 * largeA * largeA * (1 - Math.cos(angle))));
    });

    test('handles non-integer values', () => {
        const a = 5.5;
        const b = 7.3;
        const angle = Math.PI / 6; // 30 degrees
        const expected = Math.sqrt(a * a + b * b - 2 * a * b * Math.cos(angle));
        expect(calculateThirdSideUsingCosineLaw(a, b, angle)).toBeCloseTo(expected);
    });

    test('handles identical side lengths', () => {
        const a = 6;
        const b = 6;
        const angle = Math.PI / 3; // 60 degrees
        const expected = Math.sqrt(a * a + b * b - 2 * a * b * Math.cos(angle));
        expect(calculateThirdSideUsingCosineLaw(a, b, angle)).toBeCloseTo(expected);
    });

    test('throws error for non-numeric inputs', () => {
        expect(() => calculateThirdSideUsingCosineLaw({}, [], null)).toThrow();
        expect(() => calculateThirdSideUsingCosineLaw(true, false, Math.PI / 3)).toThrow();
    });
});