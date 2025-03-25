import { Segment } from '@flatten-js/core';
import ShapeWithConnectionMatrix from '../shape/Shape';
import radiansToDegrees from 'radians-degrees';

export default class Quadrilateral extends ShapeWithConnectionMatrix{
    _isAngleInDegree;
    _pointA
    _pointB
    _pointC
    _pointD
    _angleAInRadians
    _angleBInRadians
    _angleCInRadians
    _angleDInRadians

    _diagonalAC
    _diagonalBD
    _lengthDiagonalAC
    _lengthDiagonalBD

    constructor() {
        super();
    }

    _setDiagonals(){
        let diagonalAC =  this._pointA.distanceTo(this._pointC);
        this._lengthDiagonalAC = diagonalAC[0];
        this._diagonalAC = diagonalAC[1];

        let diagonalBD = this._pointB.distanceTo(this._pointD);
        this._lengthDiagonalBD = diagonalBD[0];
        this._diagonalBD = diagonalBD[1];
    }

    get angleAInRadians() {
        return this._angleAInRadians;
    }

    get angleBInRadians() {
        return this._angleBInRadians;
    }

    get angleCInRadians() {
        return this._angleCInRadians;
    }

    get angleDInRadians() {
        return this._angleDInRadians;
    }

    get angleAInDegrees() {
        return radiansToDegrees(this._angleAInRadians);
    }

    get angleBInDegrees() {
        return radiansToDegrees(this._angleBInRadians);
    }

    get angleCInDegrees() {
        return radiansToDegrees(this._angleCInRadians);
    }

    get angleDInDegrees() {
        return radiansToDegrees(this._angleDInRadians);
    }

    get pointA() {
        return this._pointA.vertices[0];
    }

    get pointB() {
        return this._pointB.vertices[0];
    }

    get pointC() {
        return this._pointC.vertices[0];
    }

    get pointD() {
        return this._pointD.vertices[0];
    }

    get segmentAB(){
        return this._pointA.distanceTo(this._pointB)[1]
    }

    get segmentBC(){
        return this._pointB.distanceTo(this._pointC)[1]
    }

    get segmentCD(){
        return this._pointC.distanceTo(this._pointD)[1]
    }

    get segmentDA(){
        return this._pointD.distanceTo(this._pointA)[1]
    }

    get lengthAB() {
        return this.segmentAB.length;
    }

    get lengthBC() {
        return this.segmentBC.length;
    }

    get lengthCD() {
        return this.segmentCD.length;
    }

    get lengthDA() {
        return this.segmentDA.length;
    }

    get lengths() {
        return {
            lengthAB: this.lengthAB,
            lengthBC: this.lengthBC,
            lengthCD: this.lengthCD,
            lengthDA: this.lengthDA
        };
    }

    get diagonalAC(){
        return this._diagonalAC;
    }

    get diagonalBD(){
        return this._diagonalBD;
    }

    get lengthDiagonalAC(){
        return this._lengthDiagonalAC;
    }

    get lengthDiagonalBD(){
        return this._lengthDiagonalBD;
    }

    get diagonalIntersectionPoint() {
        return this._diagonalAC.intersect(this._diagonalBD)[0];
    }

    get perimeter() {
        return Object.values(this.lengths).reduce(function (x, y) {
            return x + y;
        }, 0);
    }

    get semiperimeter() {
        return this.perimeter / 2;
    }
}