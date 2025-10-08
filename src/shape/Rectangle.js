import Quadrilateral from "./Quadrilateral.js";
import { Point, Segment } from "@flatten-js/core";
import { shiftCoordinate2D, isValidQuadrilateral} from '../functions/general.js'
import Angle from "./Angle.js";

export default class Rectangle extends Quadrilateral {
    constructor({points = [], lengths = {}, supplementary = {}} = {}){
        super();
        
        const {
            calculateDiagonals = false,
            shiftCoordinate = true
        } = supplementary;

        this.#setAngles();

        switch (true) {
            case Array.isArray(points) && points.length === 4 && points.every(p => Number.isFinite(p.x) && Number.isFinite(p.y)):
                this.#setCoordinatesFromPoints(points, shiftCoordinate);
                break;
            case Object.keys(lengths).length == 2:
                this.#setCoordites(lengths, shiftCoordinate);
                break;
            default:
                throw new TypeError(`Invalid arguments: Received points ${JSON.stringify(points)}, lengths ${JSON.stringify(lengths)}. Please provide either four Point or two side lengths`);
        }   

        this.addFace(this._vertices);

        if(calculateDiagonals){
            this._setDiagonals();
        }
    }

    #setAngles() {
        this._angleAInRadians = Math.PI / 2;
        this._angleBInRadians = Math.PI / 2;
        this._angleCInRadians = Math.PI / 2;
        this._angleDInRadians = Math.PI / 2;
    }

    #setCoordinatesFromPoints(points, shiftCoordinate) {
        const eps = 1e-9;
        const pts = points.map(p => (p instanceof Point ? p : new Point(p.x, p.y)));
        if (pts.length !== 4) {
            throw new TypeError("Expected 4 points to define a rectangle");
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
        
        let angleABC = new Angle(AB, BC).angleInRadians - Math.PI/2;
        let angleBCD = new Angle(BC, CD).angleInRadians - Math.PI/2;
        let angleCDA = new Angle(CD, DA).angleInRadians - Math.PI/2;
        let angleDAB = new Angle(DA, AB).angleInRadians - Math.PI/2;

        // 2) Rectangle validation: adjacent sides perpendicular and opposite sides equal
        if (
            Math.abs(angleABC) > eps ||
            Math.abs(angleBCD) > eps ||
            Math.abs(angleCDA) > eps ||
            Math.abs(angleDAB) > eps
        ) {
            throw new Error(
                "Provided points do not form a rectangle: adjacent sides are not perpendicular"
            );
        }
        if (Math.abs(AB.length - CD.length) > eps || Math.abs(BC.length - DA.length) > eps) {
            throw new Error(
                "Provided points do not form a rectangle: opposite sides are not equal"
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

    #setCoordites(lengths, shiftCoordinate) {
        let width, height;

        Object.keys(lengths).forEach(key => {
            const length = lengths[key];
            if(length > 0 && Number.isFinite(length)){
                switch(key){
                    case 'lengthAB':
                    case 'lengthCD': 
                        width = length;
                        break;
                    case 'lengthBC':
                    case 'lengthDA':   
                        height = length;
                        break;
                    default:
                        throw new Error(`Unknown lengths: ${JSON.stringify(lengths)}`);
                }
            } else {
                throw new Error(`The length must be a positive number: ${key}:${length}`);
            }
        });

        const A = new Point(0, 0);
        const B = new Point(width, 0);
        const C = new Point(width, height);
        const D = new Point(0, height);

        if (shiftCoordinate) {
            [this._pointA, this._pointB, this._pointC, this._pointD] = [A, B, C, D].map((vertex) => shiftCoordinate2D(vertex, new Point(width / 2, height / 2)));
        } else {
            [this._pointA, this._pointB, this._pointC, this._pointD] = [A, B, C, D];
        }
    
        this._vertices = [this._pointA, this._pointB, this._pointC, this._pointD];
    }
}