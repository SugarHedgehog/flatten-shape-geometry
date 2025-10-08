import Quadrilateral from "./Quadrilateral";
import { Point, Segment } from '@flatten-js/core';
import { shiftCoordinate2D, isValidQuadrilateral } from '../functions/general.js'
import Angle from "./Angle.js";

export default class Square extends Quadrilateral {
    constructor({ points = [], length, supplementary = {} } = {}) {
        super();

        const {
            calculateDiagonals = false,
            shiftCoordinate = true,
        } = supplementary;

        this.#setAngles();

        switch (true) {
            case Array.isArray(points) && points.length === 4 && points.every(p => Number.isFinite(p.x) && Number.isFinite(p.y)):
                this.#setCoordinatesFromPoints(points, shiftCoordinate);
                break;
            case length && length > 0 && Number.isFinite(Number(length)):
                this.#setCoordinates(length, shiftCoordinate);
                break;
            default:
                throw new TypeError(`Invalid arguments: Received points ${JSON.stringify(points)}, length ${JSON.stringify(length)}. Please provide either four Point or a positive side length`);
        }
        
        this.addFace(this._vertices);

        if(calculateDiagonals) {
            this._setDiagonals();
        }
    }

    #setAngles() {
        this._angleAInRadians = Math.PI / 2;
        this._angleBInRadians = Math.PI / 2;
        this._angleCInRadians = Math.PI / 2;
        this._angleDInRadians = Math.PI / 2;
    }


    #setCoordinates(length, shiftCoordinate) {
        const A = new Point(0, 0);
        const B = new Point(length, 0);
        const C = new Point(length, length);
        const D = new Point(0, length);

        if (shiftCoordinate) {
            [this._pointA, this._pointB, this._pointC, this._pointD] = [A, B, C, D].map((vertex) => shiftCoordinate2D(vertex, new Point(length / 2, length / 2)));
        } else {
            [this._pointA, this._pointB, this._pointC, this._pointD] = [A, B, C, D];
        }
        this._vertices = [this._pointA, this._pointB, this._pointC, this._pointD];
    }

    #setCoordinatesFromPoints(points, shiftCoordinate) {
        const eps = 1e-9;
        const pts = points.map(p => (p instanceof Point ? p : new Point(p.x, p.y)));
        if (pts.length !== 4) {
            throw new TypeError("Expected 4 points to define a square");
        }

        const [A, B, C, D] = pts;

        const AB = new Segment(A, B);
        const BC = new Segment(B, C);
        const CD = new Segment(C, D);
        const DA = new Segment(D, A);

        if (!isValidQuadrilateral(AB.length, BC.length, CD.length, DA.length)) {
            throw new Error(
                "Provided points do not form a valid quadrilateral: side-length constraints not satisfied"
            );
        }
        
        // Right angles at each vertex (rectangle condition)
        let angleABC = new Angle(AB, BC).angleInRadians - Math.PI/2;
        let angleBCD = new Angle(BC, CD).angleInRadians - Math.PI/2;
        let angleCDA = new Angle(CD, DA).angleInRadians - Math.PI/2;
        let angleDAB = new Angle(DA, AB).angleInRadians - Math.PI/2;

        if (
            Math.abs(angleABC) > eps ||
            Math.abs(angleBCD) > eps ||
            Math.abs(angleCDA) > eps ||
            Math.abs(angleDAB) > eps
        ) {
            throw new Error(
                "Provided points do not form a square: adjacent sides are not perpendicular"
            );
        }

        // All sides equal (square condition)
        if (
            Math.abs(AB.length - BC.length) > eps ||
            Math.abs(AB.length - CD.length) > eps ||
            Math.abs(AB.length - DA.length) > eps
        ) {
            throw new Error(
                "Provided points do not form a square: all sides must be equal"
            );
        }

        // Center (intersection of diagonals)
        const center = new Segment(A,C).middle();

        if (shiftCoordinate) {
            [this._pointA, this._pointB, this._pointC, this._pointD] = pts.map(v =>
                shiftCoordinate2D(v, center)
            );
        } else {
            [this._pointA, this._pointB, this._pointC, this._pointD] = pts;
        }

        this._vertices = [this._pointA, this._pointB, this._pointC, this._pointD];
    }
}
