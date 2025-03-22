import Quadrilateral from "./Quadrilateral";
import { Point } from '@flatten-js/core';
import { shiftCoordinate2D } from '../functions/general.js'

export default class Square extends Quadrilateral {
    constructor(length, supplementary = {}) {
        super();
        if (length <= 0 || !Number.isFinite(Number(length)))
            throw new TypeError(`Invalid length: Received length is ${JSON.stringify(length)}. Please specify a positive numeric value for the side length.`);
        this.#setSides(length)
        this.#setAngles();
        this.#setCoordites(length);
        this.addFace([this._pointA, this._pointB, this._pointC, this._pointD]);

        const {
            calculateDiagonals = false,
        } = supplementary;

        if(calculateDiagonals){
            this._setDiagonals();
        }
    }

    #setSides(length) {
        this._lengthAB = length;
        this._lengthBC = length;
        this._lengthCD = length;
        this._lengthDA = length;
    }

    #setAngles() {
        this._angleAInRadians = Math.PI / 2;
        this._angleBInRadians = Math.PI / 2;
        this._angleCInRadians = Math.PI / 2;
        this._angleDInRadians = Math.PI / 2;
    }


    #setCoordites(length) {
        const A = new Point(0, 0);
        const B = new Point(length, 0);
        const C = new Point(length, length);
        const D = new Point(0, length);

        [this._pointA, this._pointB, this._pointC, this._pointD] = [A, B, C, D].map((vertex) => shiftCoordinate2D(vertex, new Point(length / 2, length / 2)));
        this._vertices = [this._pointA, this._pointB, this._pointC, this._pointD];
    }
}