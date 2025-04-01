import Quadrilateral from "./Quadrilateral";
import { Point, Segment } from '@flatten-js/core';
import degreesToRadians from 'degrees-radians';
import { shiftCoordinate2D } from '../functions/general.js'

export default class Parallelogram extends Quadrilateral {
    constructor({lengths = {}, angles = {}, supplementary = {}} = {}) {
        super();

        if (Object.keys(lengths).length < 2)
            throw new Error(`No lengths of the parallelogram are defined. ${JSON.stringify(lengths)}`);

        if(('lengthAB' in lengths || 'lengthBC' in lengths) && ('lengthCD' in lengths || 'lengthDA' in lengths))
            throw new Error(`Two parallel sides of a parallelogram are given. ${JSON.stringify(lengths)}`);

        if (!angles.angle || typeof angles.angle !== 'object' || Object.keys(angles.angle).length === 0)
            throw new TypeError(`No angle of the parallelogram is defined. ${JSON.stringify(angles)}`);
        
        this.#setAngles(angles);
        this.#setCoordinates(lengths);
        this.addFace(this._vertices);

        const {
            calculateDiagonals = false,
            calculateHeights = false,
        } = supplementary;

        if(calculateDiagonals){
            this._setDiagonals();
        }

        if(calculateHeights){
            this._setHeights();
        }
    }

    #setAngles(angles) {
        this._isAngleInDegree = angles.angleInDegree || false;
        angles = angles.angle;

        let keyAngle;
        Object.keys(angles).forEach(key => {
                keyAngle = key;
                return;
        });

        let angle = angles[keyAngle];
        
        if(!Number.isFinite(angle))
            throw new Error(`Angle isn't a numeric value. ${keyAngle}:${angle}`);

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
                throw new Error('Angles aren\'t defined');
        }
    }

    #setCoordinates(lengths) {
        let sideAB, sideBC;

        Object.keys(lengths).forEach(key => {
            const lengthOfSide = lengths[key];
            if(lengthOfSide > 0 && Number.isFinite(Number(lengthOfSide))){
                switch(key){
                    case 'lengthAB':
                    case 'lengthCD': 
                        sideAB = lengthOfSide;
                        break;
                    case 'lengthBC':
                    case 'lengthDA':   
                        sideBC = lengthOfSide;
                        break;
                    default:
                        throw new Error(`Lengths aren't defined. ${JSON.stringify(lengths)}`);
                }
            } else {
                throw new Error(`Length isn't a positive numeric value. ${key}:${lengthOfSide}`);
            }
        });


        let x = sideBC * Math.cos(this._angleAInRadians);
        let y = sideBC * Math.sin(this._angleAInRadians);

        const A = new Point(0, 0);
        const B = new Point(sideAB, 0);
        const C = new Point(sideAB + x, y);
        const D = new Point(x, y);

        let point = new Segment(A,C).intersect(new Segment(B,D))[0];

        [this._pointA, this._pointB, this._pointC, this._pointD] = [A, B, C, D].map((vertex) => shiftCoordinate2D(vertex, point));
        this._vertices = [this._pointA, this._pointB, this._pointC, this._pointD];
    }
}
