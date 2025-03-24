import Quadrilateral from "./Quadrilateral";
import { Point, Segment } from '@flatten-js/core';
import degreesToRadians from 'degrees-radians';
import { shiftCoordinate2D } from '../functions/general.js'

export default class Parallelogram extends Quadrilateral {
    constructor(lengths = {}, angles = {}, supplementary = {}) {
        super();

        if (Object.keys(lengths).length === 0)
            throw new TypeError(`No lengths of the parallelogram are defined`);

        if (Object.keys(angles.angle).length === 0)
            throw new TypeError(`No angle of the parallelogram is defined`);
        this.#setSides(lengths);
        this.#setAngles(angles);
        this.#setCoordinates();
        this.addFace(this._vertices);

        const {
            calculateDiagonals = false,
        } = supplementary;

        if(calculateDiagonals){
            this._setDiagonals();
        }
    }

    #setSides(lengths) {
        Object.keys(lengths).forEach(key => {
                switch(key){
                    case 'lengthAB':
                    case 'lengthCD': 
                        this._lengthAB = lengths[key];
                        this._lengthCD = lengths[key];
                        break;
                    case 'lengthBC':
                    case 'lengthDA':   
                        this._lengthBC = lengths[key];
                        this._lengthDA = lengths[key];
                        break;
                    default:
                        throw new Error('Lengths arent difined');
                }
            }
        );
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

        let angle = angles[keyAngle];
        console.log(angle);

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
                throw new Error('Angles arent difined');
        }

        console.log(this._angleAInRadians, this._angleBInRadians, this._angleCInRadians, this._angleDInRadians );
    }

    #setCoordinates() {
        let x = this._lengthDA*Math.cos(this._angleAInRadians)
        let y = this._lengthDA*Math.sin(this._angleAInRadians);

        const A = new Point(0, 0);
        const B = new Point(this._lengthAB, 0);
        const C = new Point(this._lengthAB + x, y);
        const D = new Point(x, y);

        let point = new Segment(A,C).intersect(new Segment(B,D))[0];
        console.log(point);

        [this._pointA, this._pointB, this._pointC, this._pointD] = [A, B, C, D].map((vertex) => shiftCoordinate2D(vertex, point));
                this._vertices = [this._pointA, this._pointB, this._pointC, this._pointD];
        this._vertices = [this._pointA, this._pointB, this._pointC, this._pointD];
    }

}