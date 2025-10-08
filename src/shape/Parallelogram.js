import Quadrilateral from "./Quadrilateral";
import { Point, Segment } from '@flatten-js/core';
import degreesToRadians from 'degrees-radians';
import { shiftCoordinate2D, isValidQuadrilateral } from '../functions/general.js'
import Angle from "./Angle.js";

export default class Parallelogram extends Quadrilateral {
    constructor({points = [], lengths = {}, angles = {}, supplementary = {}} = {}) {
        super();

        const {
            calculateDiagonals = false,
            calculateHeights = false,
            shiftCoordinate = true,
        } = supplementary;

        switch (true) {
            case Array.isArray(points) && points.length === 4 && points.every(p => Number.isFinite(p.x) && Number.isFinite(p.y)):
                this.#setCoordinatesFromPoints(points, shiftCoordinate);
                break;
            case Object.keys(lengths).length == 2:
                if(('lengthAB' in lengths || 'lengthBC' in lengths) && ('lengthCD' in lengths || 'lengthDA' in lengths))
                    throw new Error(`Two parallel sides of a parallelogram are given. ${JSON.stringify(lengths)}`);

                if (!angles.angle || typeof angles.angle !== 'object' || Object.keys(angles.angle).length === 0)
                    throw new TypeError(`No angle of the parallelogram is defined. ${JSON.stringify(angles)}`);
                
                this.#setAngles(angles);
                this.#setCoordinates(lengths, shiftCoordinate);
                break;
            default:
               throw new TypeError(`Invalid arguments: Received points ${JSON.stringify(points)}, lengths ${JSON.stringify(lengths)}. Please provide either four Point or two side lengths`);
        }
        
        this.addFace(this._vertices);

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

    #setCoordinates(lengths, shiftCoordinate) {
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

        const center = new Segment(A,C).intersect(new Segment(B,D))[0];

        if (shiftCoordinate) {
            [this._pointA, this._pointB, this._pointC, this._pointD] = [A, B, C, D].map((vertex) => shiftCoordinate2D(vertex, center));
        } else {
            [this._pointA, this._pointB, this._pointC, this._pointD] = [A, B, C, D];
        }
        
        this._vertices = [this._pointA, this._pointB, this._pointC, this._pointD];
    }

    #setCoordinatesFromPoints(points, shiftCoordinate) {
        const eps = 1e-9;
        const pts = points.map(p => (p instanceof Point ? p : new Point(p.x, p.y)));
        if (pts.length !== 4) {
            throw new TypeError("Expected 4 points to define a parallelogram");
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
                "Provided points do not form a parallelogram: opposite sides are not parallel"
            );
        }
        if (Math.abs(AB.length - CD.length) > eps || Math.abs(BC.length - DA.length) > eps) {
            throw new Error(
                "Provided points do not form a parallelogram: opposite sides are not equal"
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
