import Quadrilateral from "./Quadrilateral";
import { Point, Segment } from '@flatten-js/core';
import {shiftCoordinate2D} from '../functions/general.js'

export default class Square extends Quadrilateral{
    constructor(length){
        super();
        this.#setSides(length)
        this.#setAngles();
        this.#setCoordites(length);
        this.addFace([this._pointA, this._pointB, this._pointC, this._pointD]);
    }

    #setSides(length){
        this._lengthAB = length;
        this._lengthBC = length;
        this._lengthCD = length;
        this._lengthDA = length;
    }

    #setAngles(){
        this._angleAInRadians = Math.PI/2;
        this._angleBInRadians = Math.PI/2;
        this._angleCInRadians = Math.PI/2;
        this._angleDInRadians = Math.PI/2;
    }


    #setCoordites(length){
        const A = new Point(0, 0);
        const B = new Point(length, 0);
        const C = new Point(length, length);
        const D = new Point(0, length);

        [this._pointA, this._pointB, this._pointC, this._pointD] = [A,B,C,D].map((vertex) => shiftCoordinate2D(vertex, new Point(length/2, length/2)));
        this._vertices = [this._pointA, this._pointB, this._pointC, this._pointD];
    }

    get vertices(){
        return this._vertices;
    }
}