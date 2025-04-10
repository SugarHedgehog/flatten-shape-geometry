import { Circle, Point} from '@flatten-js/core';
import '../src/functions/methods_for_circle.js';

describe('Circle diameter method', () => {
  const center = new Point(0, 0);
  const radius = 5;
  const circle = new Circle(center, radius);

  test('should create horizontal diameter for 0 angle (radians)', () => {
    const diameter = circle.diameter(0);
    expect(diameter.start.x).toBeCloseTo(5);
    expect(diameter.start.y).toBeCloseTo(0);
    expect(diameter.end.x).toBeCloseTo(-5);
    expect(diameter.end.y).toBeCloseTo(0);
  });

  test('should create vertical diameter for 90 degrees', () => {
    const diameter = circle.diameter(90, { angleInDegrees: true });
    expect(diameter.start.x).toBeCloseTo(0);
    expect(diameter.start.y).toBeCloseTo(5);
    expect(diameter.end.x).toBeCloseTo(0);
    expect(diameter.end.y).toBeCloseTo(-5);
  });

  test('should handle counterclockwise direction', () => {
    const diameter = circle.diameter(-Math.PI/2, { counterclockwise: true });
    expect(diameter.start.x).toBeCloseTo(0);
    expect(diameter.start.y).toBeCloseTo(5);
    expect(diameter.end.x).toBeCloseTo(0);
    expect(diameter.end.y).toBeCloseTo(-5);
  });

  test('should have correct length', () => {
    const diameter = circle.diameter(Math.PI/4);
    expect(diameter.length).toBeCloseTo(2 * radius);
  });

  test('should handle negative angles', () => {
    const diameter = circle.diameter(-Math.PI/2);
    expect(diameter.start.x).toBeCloseTo(0);
    expect(diameter.start.y).toBeCloseTo(-5);
    expect(diameter.end.x).toBeCloseTo(0);
    expect(diameter.end.y).toBeCloseTo(5);
  });
});