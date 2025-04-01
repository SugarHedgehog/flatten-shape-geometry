import Quadrilateral from "./Quadrilateral";
import { Point, Segment } from '@flatten-js/core';
import degreesToRadians from 'degrees-radians';

export default class Rhombus extends Quadrilateral {
    constructor({ 
        length, 
        angles = {}, 
        supplementary = {} 
    }) {
        super();
        
        if (!length || length <= 0 || !Number.isFinite(Number(length))) {
            throw new TypeError(`Invalid length: Received length is ${JSON.stringify(length)}. Please specify a positive numeric value for the side length.`);
        }

        if (!angles.angle || typeof angles.angle !== 'object' || Object.keys(angles.angle).length === 0) {
            throw new TypeError(`No angle of the rhombus is defined`);
        }

        this.#setAngles(angles);
        this.#setDiagonals(length);
        this.#setCoordinates();
        this.addFace(this._vertices);

        const {
            calculateHeights = false,
        } = supplementary;

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
}
