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
        return this._heightABC;
    }

    get heightACD(){
        return this._heightACD;
    }

    get heightBCD(){
        return this._heightBCD;
    }
    
    get heightBDA(){
        return this._heightBDA;
    }

    get heightCAB(){
        return this._heightCAB;
    }

    get heightCDA(){
        return this._heightCDA;
    }

    get heightDAB(){
        return this._heightDAB;
    }

    get heightDBC(){
        return this._heightDBC;
    }

    get lengthHeightABC(){
        return this.heightABC.length;
    }

    get lengthHeightACD(){
        return this.heightACD.length;
    }

    get lengthHeightBCD(){
        return this.heightBCD.length;
    }
    
    get lengthHeightBDA(){
        return this.heightBDA.length;
    }

    get lengthHeightCAB(){
        return this.heightCAB.length;
    }

    get lengthHeightCDA(){
        return this.heightCDA.length;
    }

    get lengthHeightDAB(){
        return this.heightDAB.length;
    }

    get lengthHeightDBC(){
        return this.heightDBC.length;
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