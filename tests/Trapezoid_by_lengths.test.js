import Trapezoid from '../src/shape/Trapezoid.js';
import { radiansToDegrees } from '../src/functions/general.js';

describe('Trapezoid Class 4-side initialization', () => {
  let t;

  beforeAll(() => {
    t = new Trapezoid({
      lengths: { lengthAB: 6, lengthBC: 4.1231056256177, lengthCD: 3, lengthDA: 4.4721359549996 },
      supplementary: { calculateDiagonals: true, calculateHeights: true }
    });
  });


  test('should have specified side lengths', () => {
    expect(t.lengthAB).toBeCloseTo(6);
    expect(t.lengthBC).toBeCloseTo(4.123);
    expect(t.lengthCD).toBeCloseTo(3);
    expect(t.lengthDA).toBeCloseTo(4.472);
  });

  test('should have correct trapezoid coordinates', () => {
    expect(t.pointA.x).toBeCloseTo(-3.33);
    expect(t.pointA.y).toBeCloseTo(-2.666);
    expect(t.pointB.x).toBeCloseTo(2.666);
    expect(t.pointB.y).toBeCloseTo(-2.666);
    expect(t.pointC.x).toBeCloseTo(1.666);
    expect(t.pointC.y).toBeCloseTo(1.333);
    expect(t.pointD.x).toBeCloseTo(-1.333);
    expect(t.pointD.y).toBeCloseTo(1.333);
  });

  test('should correctly calculate area, perimeter, and semiperimeter', () => {
    expect(t.area()).toBeCloseTo(18);
    expect(t.perimeter).toBeCloseTo(17.6);
    expect(t.semiperimeter).toBeCloseTo(8.8);
  });

  test('should calculate correct angles', () => {
    const totalAngles = t.angleAInDegrees + t.angleBInDegrees +
      t.angleCInDegrees + t.angleDInDegrees;
    expect(totalAngles).toBeCloseTo(360, 1);

    expect(t.angleAInRadians).toBeCloseTo(1.1071487177941);
    expect(t.angleBInRadians).toBeCloseTo(1.325817663668);
    expect(t.angleCInRadians).toBeCloseTo(1.8157749899218);
    expect(t.angleDInRadians).toBeCloseTo(2.0344439357957);
  });

  test('should have correct diagonal lengths', () => {
    expect(t.lengthDiagonalAC).toBeCloseTo(6.4031242374328);
    expect(t.lengthDiagonalBD).toBeCloseTo(5.6568542494924);
  });

  let H = 4;
  let HABC = 5.820855000872;
  let HBDA = 5.3665631459995;
  let HCDA = 2.6832815729997;
  let HDBC = 2.910427500436;


  test('should correctly calculate heights', () => {
    expect(t.lengthHeightABC).toBeCloseTo(HABC);

    // Height from A to CD
    expect(t.lengthHeightACD).toBeCloseTo(H);

    // Height from B to CD
    expect(t.lengthHeightBCD).toBeCloseTo(H);

    // Height from B to DA
    expect(t.lengthHeightBDA).toBeCloseTo(HBDA);

    // Height from C to AB
    expect(t.lengthHeightCAB).toBeCloseTo(H);

    // Height from C to DA
    expect(t.lengthHeightCDA).toBeCloseTo(HCDA);

    // Height from D to AB
    expect(t.lengthHeightDAB).toBeCloseTo(H);

    // Height from D to BC
    expect(t.lengthHeightDBC).toBeCloseTo(HDBC);
  });
});

describe('Trapezoid Class - Invalid Input Handling', () => {
  describe('Invalid lengths validation', () => {
    test('should throw error for negative length', () => {
      expect(() => new Trapezoid({
        lengths: { lengthAB: -5, lengthBC: 4, lengthCD: 3, lengthDA: 4 }
      })).toThrowError(/positive numeric value/);
    });

    test('should throw error for non-numeric length', () => {
      expect(() => new Trapezoid({
        lengths: { lengthAB: 'invalid', lengthBC: 4, lengthCD: 3, lengthDA: 4 }
      })).toThrowError(/positive numeric value/);
    });

    test('should throw error for insufficient side lengths', () => {
      expect(() => new Trapezoid({
        lengths: { lengthAB: 5, lengthBC: 4 }
      })).toThrowError(/Invalid combination of parameters/);
    });

    test('should throw error for non-trapezoid side combination', () => {
      expect(() => new Trapezoid({
        lengths: { lengthAB: 5, lengthBC: 4, lengthCD: 3, lengthDA: 2 }
      })).toThrowError(/The sides do not form a trapezoid/);
    });
  });

  describe('Missing required parameters', () => {
    test('should throw error for missing lengths', () => {
      expect(() => new Trapezoid({})).toThrowError(/Invalid combination of parameters/);
    });
  });
});