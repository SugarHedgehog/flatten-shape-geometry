import Quadrilateral from "./Quadrilateral";
import { Point, Segment } from '@flatten-js/core';
import degreesToRadians from 'degrees-radians';

export default class Rhombus extends Quadrilateral {
    constructor(length, angles = {}) {
        super();
        if (length <= 0 || !Number.isFinite(Number(length)))
            throw new TypeError(`Invalid length: Received length is ${JSON.stringify(length)}. Please specify a positive numeric value for the side length.`);

        if (!angles.angle || typeof angles.angle !== 'object' || Object.keys(angles.angle).length === 0)
            throw new TypeError(`No angle of the rhombus is defined`);

        this.#setSides(length);
        this.#setAngles(angles);
        this.#setDiagonals();
        this.#setCoordinates();
        this.addFace(this._vertices);
    }

    #setSides(length) {
        this._lengthAB = length;
        this._lengthBC = length;
        this._lengthCD = length;
        this._lengthDA = length;
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
        if (!Number.isFinite(Number(angle)))
            throw new TypeError(`Invalid angle: Received angle is ${JSON.stringify(angle)}. Please specify a numeric value for the angle.`);

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

    #setDiagonals() {
        const a = this._lengthAB;
        const angle = this._angleAInRadians;

        const d1 = 2 * a * Math.cos(angle / 2);
        const d2 = 2 * a * Math.sin(angle / 2);

        this._lengthDiagonalAC = d1;
        this._lengthDiagonalBD = d2;

        this._diagonalAC = new Segment(new Point(-d1 / 2, 0), new Point(d1 / 2, 0));
        this._diagonalBD = new Segment(new Point(0, -d2 / 2), new Point(0, d2 / 2));
    }

    #setCoordinates() {
        [this._pointA, this._pointB, this._pointC, this._pointD] = [this._diagonalAC.ps, this._diagonalBD.ps, this._diagonalAC.pe, this._diagonalBD.pe];
        this._vertices = [this._pointA, this._pointB, this._pointC, this._pointD];
    }
}