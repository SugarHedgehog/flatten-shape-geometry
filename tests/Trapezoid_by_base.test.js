import Trapezoid from '../src/shape/Trapezoid.js';
import { radiansToDegrees } from '../src/functions/general.js';

describe('Trapezoid Class 4-side initialization', () => {
  let t;

  beforeAll(() => {
    t = new Trapezoid({
      lengths: { lengthAB: 6.6307692307692, lengthCD: 5 },
      height: 4.6523076923077,
      angles: {
        angle: {
          angleA: 1.1687016242406,
        }
      },
      supplementary: { calculateDiagonals: true, calculateHeights: true }
    });
  });


  test('should have specified side lengths', () => {
    expect(t.lengthAB).toBeCloseTo(6.6307692307692);
    expect(t.lengthBC).toBeCloseTo(4.6652820712936);
    expect(t.lengthCD).toBeCloseTo(5);
    expect(t.lengthDA).toBeCloseTo(5.0555194513598);
  });

  test('should have correct trapezoid coordinates', () => {
    expect(t.pointA.x).toBeCloseTo(-3.9784615384615);
    expect(t.pointA.y).toBeCloseTo(-2.6523076923077);
    expect(t.pointB.x).toBeCloseTo(2.6523076923077);
    expect(t.pointB.y).toBeCloseTo(-2.6523076923077);
    expect(t.pointC.x).toBeCloseTo(3);
    expect(t.pointC.y).toBeCloseTo(2);
    expect(t.pointD.x).toBeCloseTo(-2);
    expect(t.pointD.y).toBeCloseTo(2);
  });

  test('should correctly calculate area, perimeter, and semiperimeter', () => {
    expect(t.area()).toBeCloseTo(27.0549585798817);
    expect(t.perimeter).toBeCloseTo(21.3515707534226);
    expect(t.semiperimeter).toBeCloseTo(10.6757853767113);
  });

  test('should calculate correct angles', () => {
    const totalAngles = t.angleAInDegrees + t.angleBInDegrees +
      t.angleCInDegrees + t.angleDInDegrees;
    expect(totalAngles).toBeCloseTo(360, 1);

    expect(t.angleAInRadians).toBeCloseTo(1.1687016242406);
    expect(t.angleBInRadians).toBeCloseTo(1.6453930988281);
    expect(t.angleCInRadians).toBeCloseTo(1.4961995547616);
    expect(t.angleDInRadians).toBeCloseTo(1.9728910293492);
  });

  test('should have correct diagonal lengths', () => {
    expect(t.lengthDiagonalAC).toBeCloseTo(8.3870669669255);
    expect(t.lengthDiagonalBD).toBeCloseTo(6.5793566347942);
  });

  let H = 4.6523076923077;
  let HABC = 6.612328735285;
  let HBDA = 6.1019206819445;
  let HCDA = 4.6012162914895;
  let HDBC = 4.9860947539852;

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

describe('Trapezoid Class 4-side initialization with different angles', () => {
  let t;

  describe('Using angleB', () => {
    beforeAll(() => {
      t = new Trapezoid({
        lengths: { lengthAB: 6.6307692307692, lengthCD: 5 },
        height: 4.6523076923077,
        angles: {
          angle: {
            angleB: 1.6453930988281,
          }
        },
        supplementary: { calculateDiagonals: true, calculateHeights: true }
      });
    });

    test('should have same side lengths', () => {
      expect(t.lengthAB).toBeCloseTo(6.6307692307692);
      expect(t.lengthBC).toBeCloseTo(4.6652820712936);
      expect(t.lengthCD).toBeCloseTo(5);
      expect(t.lengthDA).toBeCloseTo(5.0555194513598);
    });

    test('should have same coordinates', () => {
      expect(t.pointA.x).toBeCloseTo(-3.9784615384615);
      expect(t.pointA.y).toBeCloseTo(-2.6523076923077);
      expect(t.pointB.x).toBeCloseTo(2.6523076923077);
      expect(t.pointB.y).toBeCloseTo(-2.6523076923077);
      expect(t.pointC.x).toBeCloseTo(3);
      expect(t.pointC.y).toBeCloseTo(2);
      expect(t.pointD.x).toBeCloseTo(-2);
      expect(t.pointD.y).toBeCloseTo(2);
    });

    test('should have same area, perimeter and angles', () => {
      expect(t.area()).toBeCloseTo(27.0549585798817);
      expect(t.perimeter).toBeCloseTo(21.3515707534226);
      expect(t.angleAInRadians).toBeCloseTo(1.1687016242406);
      expect(t.angleBInRadians).toBeCloseTo(1.6453930988281);
      expect(t.angleCInRadians).toBeCloseTo(1.4961995547616);
      expect(t.angleDInRadians).toBeCloseTo(1.9728910293492);
    });
  });

  describe('Using angleC', () => {
    beforeAll(() => {
      t = new Trapezoid({
        lengths: { lengthAB: 6.6307692307692, lengthCD: 5 },
        height: 4.6523076923077,
        angles: {
          angle: {
            angleC: 1.4961995547616,
          }
        },
        supplementary: { calculateDiagonals: true, calculateHeights: true }
      });
    });

    test('should have same side lengths', () => {
      expect(t.lengthAB).toBeCloseTo(6.6307692307692);
      expect(t.lengthBC).toBeCloseTo(4.6652820712936);
      expect(t.lengthCD).toBeCloseTo(5);
      expect(t.lengthDA).toBeCloseTo(5.0555194513598);
    });

    test('should have same coordinates', () => {
      expect(t.pointA.x).toBeCloseTo(-3.9784615384615);
      expect(t.pointA.y).toBeCloseTo(-2.6523076923077);
      expect(t.pointB.x).toBeCloseTo(2.6523076923077);
      expect(t.pointB.y).toBeCloseTo(-2.6523076923077);
      expect(t.pointC.x).toBeCloseTo(3);
      expect(t.pointC.y).toBeCloseTo(2);
      expect(t.pointD.x).toBeCloseTo(-2);
      expect(t.pointD.y).toBeCloseTo(2);
    });

    test('should have same area, perimeter and angles', () => {
      expect(t.area()).toBeCloseTo(27.0549585798817);
      expect(t.perimeter).toBeCloseTo(21.3515707534226);
      expect(t.angleAInRadians).toBeCloseTo(1.1687016242406);
      expect(t.angleBInRadians).toBeCloseTo(1.6453930988281);
      expect(t.angleCInRadians).toBeCloseTo(1.4961995547616);
      expect(t.angleDInRadians).toBeCloseTo(1.9728910293492);
    });
  });

  describe('Using angleD', () => {
    beforeAll(() => {
      t = new Trapezoid({
        lengths: { lengthAB: 6.6307692307692, lengthCD: 5 },
        height: 4.6523076923077,
        angles: {
          angle: {
            angleD: 1.9728910293492,
          }
        },
        supplementary: { calculateDiagonals: true, calculateHeights: true }
      });
    });

    test('should have same side lengths', () => {
      expect(t.lengthAB).toBeCloseTo(6.6307692307692);
      expect(t.lengthBC).toBeCloseTo(4.6652820712936);
      expect(t.lengthCD).toBeCloseTo(5);
      expect(t.lengthDA).toBeCloseTo(5.0555194513598);
    });

    test('should have same coordinates', () => {
      expect(t.pointA.x).toBeCloseTo(-3.9784615384615);
      expect(t.pointA.y).toBeCloseTo(-2.6523076923077);
      expect(t.pointB.x).toBeCloseTo(2.6523076923077);
      expect(t.pointB.y).toBeCloseTo(-2.6523076923077);
      expect(t.pointC.x).toBeCloseTo(3);
      expect(t.pointC.y).toBeCloseTo(2);
      expect(t.pointD.x).toBeCloseTo(-2);
      expect(t.pointD.y).toBeCloseTo(2);
    });

    test('should have same area, perimeter and angles', () => {
      expect(t.area()).toBeCloseTo(27.0549585798817);
      expect(t.perimeter).toBeCloseTo(21.3515707534226);
      expect(t.angleAInRadians).toBeCloseTo(1.1687016242406);
      expect(t.angleBInRadians).toBeCloseTo(1.6453930988281);
      expect(t.angleCInRadians).toBeCloseTo(1.4961995547616);
      expect(t.angleDInRadians).toBeCloseTo(1.9728910293492);
    });
  });
});

describe('Missing required parameters', () => {
  test('should throw error for missing lengths', () => {
    expect(() => new Trapezoid({})).toThrowError(/Invalid combination of parameters/);
  });

  test('should throw error for missing height when using two bases', () => {
    expect(() => new Trapezoid({
      lengths: { lengthAB: 5, lengthCD: 3 },
      angles: { angleA: 0.5 }
    })).toThrowError(/Invalid combination of parameters/);
  });

  test('should throw error for missing angle when using two bases', () => {
    expect(() => new Trapezoid({
      lengths: { lengthAB: 5, lengthCD: 3 },
      height: 4
    })).toThrowError(/Invalid combination of parameters/);
  });
});

describe('Invalid angle specifications', () => {
  test('should throw error for invalid angle key', () => {
    expect(() => new Trapezoid({
      lengths: { lengthAB: 5, lengthCD: 3 },
      height: 4,
      angles: { angle: { invalidAngle: 0.5 } }
    })).toThrowError(/Invalid angle key/);
  });

  test('should throw error for non-numeric angle value', () => {
    expect(() => new Trapezoid({
      lengths: { lengthAB: 5, lengthCD: 3 },
      height: 4,
      angles: { angle: { angleA: 'invalid' } }
    })).toThrowError(/Angle must be a numeric value/);
  });
});

describe('Invalid height specification', () => {
  test('should throw error for non-numeric height', () => {
    expect(() => new Trapezoid({
      lengths: { lengthAB: 5, lengthCD: 3 },
      height: 'invalid',
      angles: { angle: { angleA: 0.5 } }
    })).toThrowError(/Height must be a positive numeric value/);
  });
});