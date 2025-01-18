import { isValidTriangle } from '../src/functions/general.js';

describe('isValidTriangle', () => {
    test('should return true for a valid triangle', () => {
        expect(isValidTriangle(3, 4, 5)).toBe(true);
    });

    test('should return false for a triangle with a non-positive side', () => {
        expect(isValidTriangle(0, 4, 5)).toBe(false);
        expect(isValidTriangle(3, -4, 5)).toBe(false);
        expect(isValidTriangle(3, 4, 0)).toBe(false);
    });

    test('should return false for a triangle that does not satisfy the triangle inequality', () => {
        expect(isValidTriangle(1, 2, 3)).toBe(false);
        expect(isValidTriangle(5, 1, 1)).toBe(false);
    });

    test('should return false for edge case of a degenerate triangle', () => {
        expect(isValidTriangle(1, 1, 2)).toBe(false);
    });

    test('should handle floating point numbers correctly', () => {
        expect(isValidTriangle(0.5, 0.5, 0.5)).toBe(true);
        expect(isValidTriangle(0.1, 0.1, 0.2)).toBe(false);
    });

    test('should return true for a triangle with large numbers', () => {
        expect(isValidTriangle(1e9, 1e9, 1e9)).toBe(true);
    });

    test('should return true for an equilateral triangle', () => {
        expect(isValidTriangle(5, 5, 5)).toBe(true);
    });

    test('should handle precision issues correctly', () => {
        expect(isValidTriangle(0.1 + 0.2, 0.2 + 0.3, 0.3 + 0.1)).toBe(true);
    });

    test('should return false for non-numeric input', () => {
        expect(isValidTriangle('a', 4, 5)).toBe(false);
        expect(isValidTriangle(3, 'b', 5)).toBe(false);
        expect(isValidTriangle(3, 4, 'c')).toBe(false);
    });

    test('should return false for boundary condition', () => {
        expect(isValidTriangle(1, 1, 2)).toBe(false);
        expect(isValidTriangle(2, 2, 4)).toBe(false);
    });
});