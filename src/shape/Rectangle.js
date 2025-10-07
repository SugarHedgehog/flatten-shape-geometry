import Quadrilateral from "./Quadrilateral.js";
import { Point } from '@flatten-js/core';
import { shiftCoordinate2D } from '../functions/general.js'

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
        const pts = points.map(p => (p instanceof Point ? p : new Point(p.x, p.y)));

        // Order points around the centroid to ensure A->B->C->D sequence
        const cx = (pts[0].x + pts[1].x + pts[2].x + pts[3].x) / 4;
        const cy = (pts[0].y + pts[1].y + pts[2].y + pts[3].y) / 4;
        const ordered = pts.slice().sort((a, b) => Math.atan2(a.y - cy, a.x - cx) - Math.atan2(b.y - cy, b.x - cx));

        // Validate rectangle properties: adjacent sides perpendicular and opposite sides equal
        const eps = 1e-9;
        const vec = (p, q) => ({ x: q.x - p.x, y: q.y - p.y });
        const dot = (u, v) => u.x * v.x + u.y * v.y;
        const len2 = (u) => u.x * u.x + u.y * u.y;

        const AB = vec(ordered[0], ordered[1]);
        const BC = vec(ordered[1], ordered[2]);
        const CD = vec(ordered[2], ordered[3]);
        const DA = vec(ordered[3], ordered[0]);

        if (Math.abs(dot(AB, BC)) > eps || Math.abs(dot(BC, CD)) > eps || Math.abs(dot(CD, DA)) > eps || Math.abs(dot(DA, AB)) > eps) {
            throw new Error("Provided points do not form a rectangle: adjacent sides are not perpendicular");
        }
        if (Math.abs(len2(AB) - len2(CD)) > eps || Math.abs(len2(BC) - len2(DA)) > eps) {
            throw new Error("Provided points do not form a rectangle: opposite sides are not equal");
        }

        // Calculate center of rectangle (intersection of diagonals)
        const centerX = (ordered[0].x + ordered[2].x) / 2;
        const centerY = (ordered[0].y + ordered[2].y) / 2;
        
        if (shiftCoordinate) {
            [this._pointA, this._pointB, this._pointC, this._pointD] = pts.map((vertex) => shiftCoordinate2D(vertex, new Point(centerX, centerY)));
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