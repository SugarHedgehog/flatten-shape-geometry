import { Circle, Point, Segment } from '@flatten-js/core';
import '../src/functions/methods_for_circle.js';

describe('Circle.prototype.radius', () => {
  const circle = new Circle(new Point(2, 3), 5);

  test('Creates Segment from center to point on circle', () => {
    const segment = circle.radius(0);
    expect(segment.start).toEqual(circle.pc);
    expect(segment.end).toEqual(new Point(7, 3));
  });

  test('Handles angle conversion when angleInDegrees=true', () => {
    const segment = circle.radius(90, { angleInDegrees: true });
    expect(segment.end.x).toBeCloseTo(2);
    expect(segment.end.y).toBeCloseTo(8);
  });

  test('Reverses angle direction with counterclockwise=true', () => {
    const segmentCW = circle.radius(Math.PI/2, { counterclockwise: false });
    const segmentCCW = circle.radius(-Math.PI/2, { counterclockwise: true });
    expect(segmentCW.end).toEqual(segmentCCW.end);
  });

  test('Propagates errors from invalid angles', () => {
    expect(() => circle.radius('90')).toThrow('Angle must be a number');
    expect(() => circle.radius(3 * Math.PI)).toThrow('greater than 2 pi');
  });

  test('Works with default parameters', () => {
    const segment = circle.radius(Math.PI);
    expect(segment.end.x).toBeCloseTo(-3);
    expect(segment.end.y).toBeCloseTo(3);
  });
});