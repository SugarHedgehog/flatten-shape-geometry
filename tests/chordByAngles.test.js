import { Circle, Point, Segment} from '@flatten-js/core';
import '../src/functions/methods_for_circle.js';

describe('Circle.prototype.chordByAngles', () => {
  const circle = new Circle(new Point(0, 0), 5);

  test('Should throw error when angles are equal', () => {
    expect(() => circle.chordByAngles(0, 0)).toThrow();
    expect(() => circle.chordByAngles(90, 90, {angleInDegrees: true})).toThrow();
  });

  test('Correctly calculates chord for angles in radians', () => {
    const chord = circle.chordByAngles(0, Math.PI/2);
    expect(chord).toBeInstanceOf(Segment);
    
    // Check start point (5, 0)
    expect(chord.start.x).toBeCloseTo(5);
    expect(chord.start.y).toBeCloseTo(0);
    
    // Check end point (0, 5)
    expect(chord.end.x).toBeCloseTo(0);
    expect(chord.end.y).toBeCloseTo(5);
  });

  test('Correctly calculates chord for angles in degrees', () => {
    const chord = circle.chordByAngles(0, 90, {angleInDegrees: true});
    
    // Check start point (5, 0)
    expect(chord.start.x).toBeCloseTo(5);
    expect(chord.start.y).toBeCloseTo(0);
    
    // Check end point (0, 5)
    expect(chord.end.x).toBeCloseTo(0);
    expect(chord.end.y).toBeCloseTo(5);
  });

  test('Handles counterclockwise direction correctly', () => {
    const chordCCW = circle.chordByAngles(0, 90, {
      angleInDegrees: true,
      counterclockwise: true
    });
    
    const chordCW = circle.chordByAngles(0, 90, {
      angleInDegrees: true,
      counterclockwise: false
    });

    // Compare coordinates for different directions
    expect(chordCCW.start).toEqual(chordCW.start);
    expect(chordCCW.end).not.toEqual(chordCW.end);
  });

  test('Handles negative angles correctly', () => {
    const chord = circle.chordByAngles(-90, 0, {angleInDegrees: true});
    expect(chord.start.x).toBeCloseTo(0);
    expect(chord.start.y).toBeCloseTo(-5);
    expect(chord.end.x).toBeCloseTo(5);
    expect(chord.end.y).toBeCloseTo(0);
  });
});
