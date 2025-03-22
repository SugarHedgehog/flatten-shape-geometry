import Quadrilateral from "./Quadrilateral.js";
import { Point } from '@flatten-js/core';
import { shiftCoordinate2D } from '../functions/general.js'

export default class Rectangle extends Quadrilateral {
    constructor(lengths = {}, supplementary = {}){
        super();
        const {width, height} = lengths;
        if (width <= 0|| height <= 0 || !Number.isFinite(Number(width))|| !Number.isFinite(Number(height)))
            throw new TypeError(`Invalid lengths: Received lengths are ${JSON.stringify(lengths)}. Please provide two positive numeric side lengths.`);

        this.#setSides(width, height)
        this.#setAngles();
        this.#setCoordites(width, height);
        this.addFace([this._pointA, this._pointB, this._pointC, this._pointD]);

        const {
            calculateDiagonals = false,
        } = supplementary;

        if(calculateDiagonals){
            this._setDiagonals();
        }
    }

    #setSides(width, height) {
        this._lengthAB = width;
        this._lengthBC = height;
        this._lengthCD = width;
        this._lengthDA = height;
    }

    #setAngles() {
        this._angleAInRadians = Math.PI / 2;
        this._angleBInRadians = Math.PI / 2;
        this._angleCInRadians = Math.PI / 2;
        this._angleDInRadians = Math.PI / 2;
    }

    #setCoordites(width, height) {
        const A = new Point(0, 0);
        const B = new Point(width, 0);
        const C = new Point(width, height);
        const D = new Point(0, height);

        [this._pointA, this._pointB, this._pointC, this._pointD] = [A, B, C, D].map((vertex) => shiftCoordinate2D(vertex, new Point(width / 2, height / 2)));
        this._vertices = [this._pointA, this._pointB, this._pointC, this._pointD];
    }
}