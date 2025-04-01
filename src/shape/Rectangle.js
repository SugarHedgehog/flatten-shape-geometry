import Quadrilateral from "./Quadrilateral.js";
import { Point } from '@flatten-js/core';
import { shiftCoordinate2D } from '../functions/general.js'

export default class Rectangle extends Quadrilateral {
    constructor({lengths = {}, supplementary = {}}){
        super();

        if (Object.keys(lengths).length !== 2)
            throw new Error(`There must be exactly two lengths. Received: ${JSON.stringify(lengths)}`);

        this.#setAngles();
        this.#setCoordites(lengths);
        this.addFace(this._vertices);

        const {
            calculateDiagonals = false,
        } = supplementary;

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

    #setCoordites(lengths) {
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

        [this._pointA, this._pointB, this._pointC, this._pointD] = [A, B, C, D].map((vertex) => shiftCoordinate2D(vertex, new Point(width / 2, height / 2)));
        this._vertices = [this._pointA, this._pointB, this._pointC, this._pointD];
    }
}