import ShapeWithConnectionMatrix from '../shape/Shape';
import radiansToDegrees from 'radians-degrees';
import {perpendicular} from '../functions/general'
import { Segment } from '@flatten-js/core';

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

    _heightABC
    _heightACD
    _heightBCD
    _heightBDA
    _heightCAB
    _heightCDA
    _heightDAB
    _heightDBC

    constructor() {
        super();
        this._connectionMatrix = [
            [1],
            [0, 1],
            [1, 0, 1]
        ];
    }
    _checkDiagonal(value, propertyName) {
        if (value === undefined || value === null) {
            throw new Error(`${propertyName} is not defined. Use "supplementary:{calculateDiagonals:true}"`);
        }
    }

    _checkHeight(value, propertyName) {
        if (value === undefined || value === null) {
            if (this instanceof Square || this instanceof Rectangle) {
                throw new Error(`${propertyName} is not defined for Square or Rectangle.`);
            } else {
                throw new Error(`${propertyName} is not defined. Use "supplementary:{calculateHeights:true}"`);
            }
        }
    }

    _setDiagonals(){
        let diagonalAC =  this._pointA.distanceTo(this._pointC);
        this._lengthDiagonalAC = diagonalAC[0];
        this._diagonalAC = diagonalAC[1];

        let diagonalBD = this._pointB.distanceTo(this._pointD);
        this._lengthDiagonalBD = diagonalBD[0];
        this._diagonalBD = diagonalBD[1];
    }

    _setHeights(){
        this._heightABC = perpendicular(this._pointA, this.segmentBC)[1];
        this._heightACD = perpendicular(this._pointA, this.segmentCD)[1];

        this._heightBCD = perpendicular(this._pointB, this.segmentCD)[1]; 
        this._heightBDA = perpendicular(this._pointB, this.segmentDA)[1];

        this._heightCAB = perpendicular(this._pointC, this.segmentAB)[1];
        this._heightCDA = perpendicular(this._pointC, this.segmentDA)[1];

        this._heightDAB = perpendicular(this._pointD, this.segmentAB)[1];
        this._heightDBC = perpendicular(this._pointD, this.segmentBC)[1];
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

    get heightABC(){
        this._checkHeight(this._heightABC, 'heightABC');
        return this._heightABC;
    }

    get heightACD(){
        this._checkHeight(this._heightACD, 'heightACD');
        return this._heightACD;
    }

    get heightBCD(){
        this._checkHeight(this._heightBCD, 'heightBCD');
        return this._heightBCD;
    }
    
    get heightBDA(){
        this._checkHeight(this._heightBDA, 'heightBDA');
        return this._heightBDA;
    }

    get heightCAB(){
        this._checkHeight(this._heightCAB, 'heightCAB');
        return this._heightCAB;
    }

    get heightCDA(){
        this._checkHeight(this._heightCDA, 'heightCDA');
        return this._heightCDA;
    }

    get heightDAB(){
        this._checkHeight(this._heightDAB, 'heightDAB');
        return this._heightDAB;
    }

    get heightDBC(){
        this._checkHeight(this._heightDBC, 'heightDBC');
        return this._heightDBC;
    }

    get lengthHeightABC(){
        this._checkHeight(this._heightABC, 'lengthHeightABC');
        return this._heightABC?.length;
    }

    get lengthHeightACD(){
        this._checkHeight(this._heightACD, 'lengthHeightACD');
        return this._heightACD?.length;
    }

    get lengthHeightBCD(){
        this._checkHeight(this._heightBCD, 'lengthHeightBCD');
        return this._heightBCD?.length;
    }
    
    get lengthHeightBDA(){
        this._checkHeight(this._heightBDA, 'lengthHeightBDA');
        return this._heightBDA?.length;
    }

    get lengthHeightCAB(){
        this._checkHeight(this._heightCAB, 'lengthHeightCAB');
        return this._heightCAB?.length;
    }

    get lengthHeightCDA(){
        this._checkHeight(this._heightCDA, 'lengthHeightCDA');
        return this._heightCDA?.length;
    }

    get lengthHeightDAB(){
        this._checkHeight(this._heightDAB, 'lengthHeightDAB');
        return this._heightDAB?.length;
    }

    get lengthHeightDBC(){
        this._checkHeight(this._heightDBC, 'lengthHeightDBC');
        return this._heightDBC?.length;
    }

    get diagonalAC(){
        this._checkDiagonal(this._diagonalAC, 'diagonalAC');
        return this._diagonalAC;
    }

    get diagonalBD(){
        this._checkDiagonal(this._diagonalBD, 'diagonalBD');
        return this._diagonalBD;
    }

    get lengthDiagonalAC(){
        this._checkDiagonal(this._lengthDiagonalAC, 'lengthDiagonalAC');
        return this._lengthDiagonalAC;
    }

    get lengthDiagonalBD(){
        this._checkDiagonal(this._lengthDiagonalBD, 'lengthDiagonalBD');
        return this._lengthDiagonalBD;
    }

    get diagonalIntersectionPoint() {
        return new Segment(this.pointA, this.pointC).intersect(new Segment(this.pointB, this.pointD))[0];
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
