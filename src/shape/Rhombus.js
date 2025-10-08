import Quadrilateral from "./Quadrilateral";
import { Point, Segment } from '@flatten-js/core';
import degreesToRadians from 'degrees-radians';
import { shiftCoordinate2D, isValidQuadrilateral } from '../functions/general.js';
import Angle from "./Angle.js";

export default class Rhombus extends Quadrilateral {
    constructor({ points = [], length, angles = {}, supplementary = {} } = {}) {
        super();

        const {
            calculateHeights = false,
            shiftCoordinate = true,
        } = supplementary;
        
        switch (true) {
            case Array.isArray(points) && points.length === 4 && points.every(p => Number.isFinite(p.x) && Number.isFinite(p.y)):
                this.#setCoordinatesFromPoints(points, shiftCoordinate);
                break;
            case length && length > 0 && Number.isFinite(Number(length)):
                if (!angles.angle || typeof angles.angle !== 'object' || Object.keys(angles.angle).length === 0) {
                    throw new TypeError(`No angle of the rhombus is defined`);
                }
                this.#setAngles(angles);
                this.#setDiagonals(length);
                this.#setCoordinates();
                break;
            default: 
                throw new TypeError(`Invalid arguments: Received points ${JSON.stringify(points)}, length ${JSON.stringify(length)}. Please provide either four Point or side length`);

        }

        this.addFace(this._vertices);

        if(calculateHeights) {
            this._setHeights();
        }
    }

    #setAngles(angles) {
        this._isAngleInDegree = angles.angleInDegree || false;
        angles = angles.angle;

        let keyAngle;
        Object.keys(angles).forEach(key => {
            if (angles[key] !== undefined && angles[key] !== null) {
                keyAngle = key;
                return;
            }
        });

        if (!keyAngle) {
            throw new Error('No angle of the rhombus is defined');
        }

        let angle = angles[keyAngle];
        if (!Number.isFinite(Number(angle))) {
            throw new TypeError(`Invalid angle: Received angle is ${JSON.stringify(angle)}. Please specify a numeric value for the angle.`);
        }

        angle = this._isAngleInDegree ? degreesToRadians(angle) : angle;
        let angleOther = Math.PI - angle;

        switch (keyAngle) {
            case 'angleA':
            case 'angleC':
                this._angleAInRadians = angle;
                this._angleBInRadians = angleOther;
                this._angleCInRadians = angle;
                this._angleDInRadians = angleOther;
                break;
            case 'angleB':
            case 'angleD':
                this._angleAInRadians = angleOther;
                this._angleBInRadians = angle;
                this._angleCInRadians = angleOther;
                this._angleDInRadians = angle;
                break;
            default:
                throw new Error('Angles are not defined');
        }
    }

    #setDiagonals(length) {
        const angle = this._angleAInRadians;

        const d1 = 2 * length * Math.cos(angle / 2);
        const d2 = 2 * length * Math.sin(angle / 2);

        this._lengthDiagonalAC = d1;
        this._lengthDiagonalBD = d2;

        this._diagonalAC = new Segment(new Point(-d1 / 2, 0), new Point(d1 / 2, 0));
        this._diagonalBD = new Segment(new Point(0, -d2 / 2), new Point(0, d2 / 2));
    }

    #setCoordinates() {
        [this._pointA, this._pointB, this._pointC, this._pointD] = [this._diagonalAC.ps, this._diagonalBD.ps, this._diagonalAC.pe, this._diagonalBD.pe];
        this._vertices = [this._pointA, this._pointB, this._pointC, this._pointD];
    }

    #setCoordinatesFromPoints(points, shiftCoordinate) {
        const eps = 1e-9;
        const pts = points.map(p => (p instanceof Point ? p : new Point(p.x, p.y)));
        if (pts.length !== 4) {
            throw new TypeError("Expected 4 points to define a rhombus");
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

        let angleDAB = new Angle(D, A, B).angleInRadians;
        let angleABC = new Angle(A, B, C).angleInRadians;
        let angleBCD = new Angle(B, C, D).angleInRadians;
        let angleCDA = new Angle(C, D, A).angleInRadians;

        if (
            Math.abs(angleABC - angleCDA) > eps ||
            Math.abs(angleBCD - angleDAB) > eps
        ) {
            throw new Error(
                "Provided points do not form a rhombus: opposite sides are not parallel"
            );
        }

        if (Math.abs(AB.length - BC.length) > eps || Math.abs(AB.length - CD.length) > eps || Math.abs(AB.length - DA.length) > eps) {
            throw new Error(
                "Provided points do not form a rhombus: all sides must be equal"
            );
        }

        // Set angles from points
        this._angleAInRadians = angleDAB;
        this._angleBInRadians = angleABC;
        this._angleCInRadians = angleBCD;
        this._angleDInRadians = angleCDA;

        // Center (intersection of diagonals)
        const center = new Segment(A, C).intersect(new Segment(B, D))[0];

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
