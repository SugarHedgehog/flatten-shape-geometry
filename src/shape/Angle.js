import { Point, Vector, Segment } from '@flatten-js/core';
import radiansToDegrees from 'radians-degrees';

export default class Angle {
    #vector1;
    #vector2;
    #angleInRadians;

    constructor(firstParameter, secondParameter, thirdParameter) {
        switch (true) {
            case firstParameter instanceof Point && secondParameter instanceof Point && thirdParameter instanceof Point:
                this._createFromPoints(firstParameter, secondParameter, thirdParameter);
                break;
            case firstParameter instanceof Segment && secondParameter instanceof Segment:
                this._createFromSegments(firstParameter, secondParameter);
                break;
            case firstParameter instanceof Vector && secondParameter instanceof Vector:
                this._createFromVectors(firstParameter, secondParameter);
                break;
            case Number.isFinite(Number(firstParameter)) && Number.isFinite(Number(secondParameter)) && Number.isFinite(Number(thirdParameter)):
                this._createFromAngleSides(firstParameter, secondParameter, thirdParameter);
                break;
            default:
                throw new Error("Invalid arguments: Please provide either three Points, two Segments, two Vectors, or two side lengths and an angle. Check the types and number of inputs.");
        }
        this.#angleInRadians = this.#vector1.angleTo(this.#vector2);
    }
    
    _createFromPoints(p1, p2, p3) {
        this.#vector1 = new Vector(p2, p1);
        this.#vector2 = new Vector(p2, p3);
    
        if (this._areVectorsCollinear(this.#vector1, this.#vector2)) {
            throw new Error("The points are collinear and do not form an angle.");
        }
    }
    
    _createFromSegments(segment1, segment2) {
        this.#vector1 = new Vector(segment1.start, segment1.end);
        this.#vector2 = new Vector(segment2.start, segment2.end);
    
        if (this._areVectorsCollinear(this.#vector1, this.#vector2)) {
            throw new Error("The segments are collinear and do not form an angle.");
        }
    }
    
    _createFromVectors(vector1, vector2) {
        this.#vector1 = vector1;
        this.#vector2 = vector2;
    
        if (this._areVectorsCollinear(this.#vector1, this.#vector2)) {
            throw new Error("The vectors are collinear and do not form an angle.");
        }
    }
    
    _createFromAngleSides(length1, length2, angle) {
        if (angle < 0 || angle > 2 * Math.PI) {
            throw new Error("Angle must be between 0 and 2π radians.");
        }
        this.#vector1 = new Vector(new Point(0, 0), new Point(length1, 0));
        
        const x2 = length2 * Math.cos(angle);
        const y2 = length2 * Math.sin(angle);
        this.#vector2 = new Vector(new Point(0, 0), new Point(x2, y2));
    }
    
    _areVectorsCollinear(vector1, vector2) {
        return vector1.cross(vector2) === 0;
    }
    
    get vector1() {
        return this.#vector1;
    }
    
    get vector2() {
        return this.#vector2;
    }
    
    get angleInRadians() {
        return this.#angleInRadians;
    }
    
    get angleInDegrees() {
        return radiansToDegrees(this.#angleInRadians);
    }
}