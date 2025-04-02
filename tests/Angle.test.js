import { Point, Segment, Vector } from '@flatten-js/core';
    import Angle from '../src/shape/Angle';
    import radiansToDegrees from 'radians-degrees';

    describe('Angle class', () => {
        describe('Constructor', () => {
            describe('Three Points', () => {
                it('Should create angle from three non-collinear points', () => {
                    const p1 = new Point(0, 0);
                    const p2 = new Point(1, 0);
                    const p3 = new Point(0, 1);
                    
                    const angle = new Angle(p2, p1, p3);
                    expect(angle.angleInRadians).toBeCloseTo(Math.PI / 2);
                });

                it('Should throw error for collinear points', () => {
                    const p1 = new Point(0, 0);
                    const p2 = new Point(1, 0);
                    const p3 = new Point(2, 0);
                    
                    expect(() => new Angle(p1, p2, p3)).toThrow(/collinear/);
                });
            });

            describe('Two Segments', () => {
                it('Should create angle from two intersecting segments', () => {
                    const seg1 = new Segment(new Point(0, 0), new Point(1, 0));
                    const seg2 = new Segment(new Point(0, 0), new Point(0, 1));
                    
                    const angle = new Angle(seg1, seg2);
                    expect(angle.angleInRadians).toBeCloseTo(Math.PI / 2);
                });

                it('Should throw error for collinear segments', () => {
                    const seg1 = new Segment(new Point(0, 0), new Point(1, 0));
                    const seg2 = new Segment(new Point(0, 0), new Point(2, 0));
                    
                    expect(() => new Angle(seg1, seg2)).toThrow(/collinear/);
                });
            });

            describe('Two Vectors', () => {
                it('Should create angle from two vectors', () => {
                    const vec1 = new Vector(new Point(0, 0), new Point(1, 0));
                    const vec2 = new Vector(new Point(0, 0), new Point(0, 1));
                    
                    const angle = new Angle(vec1, vec2);
                    expect(angle.angleInRadians).toBeCloseTo(Math.PI / 2);
                });

                it('Should throw error for collinear vectors', () => {
                    const vec1 = new Vector(new Point(0, 0), new Point(1, 0));
                    const vec2 = new Vector(new Point(0, 0), new Point(2, 0));
                    
                    expect(() => new Angle(vec1, vec2)).toThrow(/collinear/);
                });
            });

            describe('Two Sides and Angle', () => {
                it('Should create angle from side lengths and angle', () => {
                    const length1 = 1;
                    const length2 = 1;
                    const angle = Math.PI / 2;
                    
                    const angleObj = new Angle(length1, length2, angle);
                    expect(angleObj.angleInRadians).toBeCloseTo(angle);
                });
            });
        });

        describe('Getters', () => {
            it('Should return correct angle in degrees', () => {
                const vec1 = new Vector(new Point(0, 0), new Point(1, 0));
                const vec2 = new Vector(new Point(0, 0), new Point(0, 1));
                const angle = new Angle(vec1, vec2);
                
                expect(angle.angleInDegrees).toBeCloseTo(radiansToDegrees(Math.PI / 2));
            });
        });

        describe('Bisector Vector', () => {
            it('Should return correct bisector vector', () => {
                const vec1 = new Vector(new Point(0, 0), new Point(1, 0));
                const vec2 = new Vector(new Point(0, 0), new Point(0, 1));
                const angle = new Angle(vec1, vec2);
                
                const bisector = angle.bisectorVector;
                expect(bisector.x).toBeCloseTo(Math.sqrt(2)/2);
                expect(bisector.y).toBeCloseTo(Math.sqrt(2)/2);
            });
        });
    });