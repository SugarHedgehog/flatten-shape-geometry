import { perpendicular } from '../src/functions/general';
import { Point, Segment } from '@flatten-js/core';

describe('perpendicular function', () => {
    it('should return array with distance and Segment object', () => {
        const point = new Point(0, 0);
        const segment = new Segment(new Point(0, 1), new Point(1, 0));
        const result = perpendicular(point, segment);
        
        expect(result).toHaveLength(2);
        expect(typeof result[0]).toBe('number');
        expect(result[1] instanceof Segment).toBe(true);
    });

    it('should calculate distance from point to segment in basic case', () => {
        const point = new Point(0, 0);
        const segment = new Segment(new Point(0, 1), new Point(1, 0));
        const [distance, perpendicularSegment] = perpendicular(point, segment);
        
        expect(distance).toBeCloseTo(Math.sqrt(2) / 2, 3);
        expect(perpendicularSegment.start).toEqual(point);
        expect(perpendicularSegment.end).not.toEqual(point);
    });

    it('should throw error when point is on the same line as segment', () => {
        const point = new Point(1, 1);
        const segment = new Segment(new Point(0, 0), new Point(2, 2));
        expect(() => perpendicular(point, segment)).toThrow('The point and the segment lie on the same straight line');
    });

    it('should calculate distance from point to horizontal segment', () => {
        const point = new Point(2, 3);
        const segment = new Segment(new Point(1, 1), new Point(4, 1));
        const [distance, perpendicularSegment] = perpendicular(point, segment);
        
        expect(distance).toBe(2);
        expect(perpendicularSegment.start).toEqual(point);
        expect(perpendicularSegment.end.y).toBe(1);
    });

    it('should calculate distance from point to vertical segment', () => {
        const point = new Point(3, 2);
        const segment = new Segment(new Point(1, 1), new Point(1, 4));
        const [distance, perpendicularSegment] = perpendicular(point, segment);
        
        expect(distance).toBe(2);
        expect(perpendicularSegment.start).toEqual(point);
        expect(perpendicularSegment.end.x).toBe(1);
    });
});