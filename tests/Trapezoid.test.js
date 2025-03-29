import Trapezoid from '../src/shape/Trapezoid';
    import { Point } from '@flatten-js/core';
    import degreesToRadians from 'degrees-radians';
    
    describe('Trapezoid', () => {
        describe('Constructor', () => {
            it('should create a trapezoid with valid parameters', () => {
                const trapezoid = new Trapezoid({
                    lengths: { lengthAB: 5, lengthBC: 3, lengthCD: 4, lengthDA: 3 }
                });
                expect(trapezoid).toBeInstanceOf(Trapezoid);
            });

            it('should throw error with invalid lengths', () => {
                expect(() => {
                    new Trapezoid({
                        lengths: { lengthAB: 5, lengthBC: 3, lengthCD: 4 }
                    });
                }).toThrowErrorMatchingInlineSnapshot(`Invalid combination of parameters: ${JSON.stringify({ lengths, angles })}`);
            });

            it('should throw error with non-numeric lengths', () => {
                expect(() => {
                    new Trapezoid({
                        lengths: { lengthAB: 'invalid', lengthBC: 3, lengthCD: 4, lengthDA: 3 }
                    });
                }).toThrowErrorMatchingInlineSnapshot(`"length is not positive numeric value."`);
            });

            it('should create trapezoid with height and angle', () => {
                const trapezoid = new Trapezoid({
                    lengths: { lengthAB: 5, lengthCD: 3 },
                    height: 4,
                    angles: { angleA: 60 }
                });
                expect(trapezoid).toBeInstanceOf(Trapezoid);
            });
        });

        describe('#setAngles', () => {
            it('should set all angles correctly', () => {
                const trapezoid = new Trapezoid({
                    lengths: { lengthAB: 5, lengthBC: 3, lengthCD: 4, lengthDA: 3 }
                });
                expect(trapezoid.angleAInDegrees).toBeGreaterThan(0);
                expect(trapezoid.angleBInDegrees).toBeGreaterThan(0);
                expect(trapezoid.angleCInDegrees).toBeGreaterThan(0);
                expect(trapezoid.angleDInDegrees).toBeGreaterThan(0);
            });
        });

        describe('_trapezoidByLengths', () => {
            it('should calculate vertices correctly', () => {
                const trapezoid = new Trapezoid({
                    lengths: { lengthAB: 5, lengthBC: 3, lengthCD: 4, lengthDA: 3 }
                });
                expect(trapezoid.pointA).toEqual(new Point(0, 0));
                expect(trapezoid.pointB).toEqual(new Point(5, 0));
            });

            it('should throw error with invalid length combination', () => {
                expect(() => {
                    new Trapezoid({
                        lengths: { lengthAB: 5, lengthBC: 3, lengthCD: 4, lengthDA: 1 }
                    });
                }).toThrowErrorMatchingInlineSnapshot(`"The sides do not form a trapezoid."`);
            });
        });

        describe('_calculateTrapezoidHeight', () => {
            it('should calculate height correctly', () => {
                const height = Trapezoid.prototype._calculateTrapezoidHeight.call({
                    lengthAB: 5,
                    lengthBC: 3,
                    lengthCD: 4,
                    lengthDA: 3
                }, 5, 3, 4, 3);
                expect(height).toBeCloseTo(2.4);
            });
        });

        describe('_trapezoidByTwoBasesHeightAngle', () => {
            it('should calculate vertices with angleA', () => {
                const trapezoid = new Trapezoid({
                    lengths: { lengthAB: 5, lengthCD: 3 },
                    height: 4,
                    angles: { angleA: degreesToRadians(60) }
                });
                expect(trapezoid.pointD.x).toBeCloseTo(4);
            });

            it('should calculate vertices with angleB', () => {
                const trapezoid = new Trapezoid({
                    lengths: { lengthAB: 5, lengthCD: 3 },
                    height: 4,
                    angles: { angleB: degreesToRadians(60) }
                });
                expect(trapezoid.pointC.x).toBeCloseTo(5 - 4);
            });
        });

        describe('Inherited methods', () => {
            it('should have correct perimeter', () => {
                const trapezoid = new Trapezoid({
                    lengths: { lengthAB: 5, lengthBC: 3, lengthCD: 4, lengthDA: 3 }
                });
                expect(trapezoid.perimeter).toBeCloseTo(15);
            });

            it('should have correct diagonal lengths', () => {
                const trapezoid = new Trapezoid({
                    lengths: { lengthAB: 5, lengthBC: 3, lengthCD: 4, lengthDA: 3 },
                    supplementary: { calculateDiagonals: true }
                });
                expect(trapezoid.lengthDiagonalAC).toBeGreaterThan(0);
                expect(trapezoid.lengthDiagonalBD).toBeGreaterThan(0);
            });

            it('should have correct heights', () => {
                const trapezoid = new Trapezoid({
                    lengths: { lengthAB: 5, lengthBC: 3, lengthCD: 4, lengthDA: 3 },
                    supplementary: { calculateHeights: true }
                });
                expect(trapezoid.lengthHeightABC).toBeGreaterThan(0);
                expect(trapezoid.lengthHeightACD).toBeGreaterThan(0);
            });
        });
    });