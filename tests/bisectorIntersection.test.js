import { bisectorIntersection } from '../src/functions/general';
import {Segment, Point } from '@flatten-js/core';

describe('bisectorIntersection', () => {
    it('should return a segment when bisector intersects a single segment', () => {
        // Create points for angle
        
        const p1 = new Point(0, 1);
        const p2 = new Point(0, 0);
        const p3 = new Point(1, 0);
        
        // Create a segment that crosses the bisector (y=x line)
        const segment = new Segment(
            new Point(1, 2),
            new Point(2, 1)
        );
        
        const result = bisectorIntersection({fP:p1, sP:p2, tP: p3}, [segment]);

        expect(result.length).toBe(1);
        expect(result[0].start).toEqual(p2);
        expect(result[0].end.x).toBeCloseTo(1.5);
        expect(result[0].end.y).toBeCloseTo(1.5);
    });
    
     it('should return multiple segments for multiple intersections', () => {
        const p1 = new Point(1, 0);
        const p2 = new Point(0, 0);
        const p3 = new Point(0, 1);
        
        const segments = [
            new Segment(new Point(-1, -1), new Point(1, 1)),
            new Segment(new Point(-2, 2), new Point(2, -2))
        ];
        
        const result = bisectorIntersection({fP:p1, sP:p2, tP: p3}, segments);
        
        expect(result.length).toBe(2);
        result.forEach(segment => {
            expect(segment.start).toEqual(p2);
        });
    });
    
    it('should return empty array when no intersections', () => {
        const p1 = new Point(0, 0);
        const p2 = new Point(1, 0);
        const p3 = new Point(0, 1);
        
        const segment = new Segment(
            new Point(2, 2),
            new Point(3, 3)
        );
        
        const result = bisectorIntersection({fP:p1, sP:p2, tP: p3}, [segment]);
        
        expect(result.length).toBe(0);
    });
    
    it('should throw error for invalid input types', () => {
        expect(() => bisectorIntersection({}, {}, {}, [])).toThrow(Error);
        expect(() => bisectorIntersection(new Point(0,0), new Point(0,0), new Point(0,0), [{}])).toThrow(Error);
    });
});