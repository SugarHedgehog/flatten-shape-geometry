import { Circle, Point } from '@flatten-js/core';
import '../src/functions/methods_for_circle.js';

describe('Circle.prototype.pointOnCircle', () => {
  const circle = new Circle(new Point(0, 0), 5);

  test('Returns correct point for angle in radians', () => {
    const point = circle.pointOnCircle(0, { angleInDegrees: false });
    expect(point).toEqual(new Point(5, 0));
  });

  test('Converts degrees to radians when angleInDegrees=true', () => {
    const point = circle.pointOnCircle(90, { angleInDegrees: true });
    expect(point.x).toBeCloseTo(0);
    expect(point.y).toBeCloseTo(5);
  });

  test('Handles counterclockwise direction', () => {
    const pointCW = circle.pointOnCircle(Math.PI/2, { counterclockwise: false });
    const pointCCW = circle.pointOnCircle(-Math.PI/2, { counterclockwise: true });
    expect(pointCW).toEqual(pointCCW);
  });

  test('Throws error for non-numeric angle', () => {
    expect(() => circle.pointOnCircle('90')).toThrow("Angle must be a number");
    expect(() => circle.pointOnCircle(NaN)).toThrow("Angle must be a number");
    expect(() => circle.pointOnCircle(null)).toThrow("Angle must be a number");
    expect(() => circle.pointOnCircle(undefined)).toThrow("Angle must be a number");
  });
  
  test('Accepts zero as valid angle', () => {
    expect(() => circle.pointOnCircle(0)).not.toThrow();
  });

  test('Throws error for angle > 2π', () => {
    expect(() => circle.pointOnCircle(3 * Math.PI)).toThrow("The angle is greater than 2 pi");
  });

  test('Boundary angle cases', () => {
    expect(circle.pointOnCircle(Math.PI/2).x).toBeCloseTo(0);
    expect(circle.pointOnCircle(Math.PI/2).y).toBeCloseTo(5);
    expect(circle.pointOnCircle(Math.PI*3/2).x).toBeCloseTo(0);
    expect(circle.pointOnCircle(Math.PI*3/2).y).toBeCloseTo(-5);
  });
});