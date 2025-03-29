import Quadrilateral from "./Quadrilateral";
import Angle from "./Angle.js";
import { Point } from '@flatten-js/core';
import degreesToRadians from 'degrees-radians';
import { shiftCoordinate2D} from '../functions/general.js'

export default class Trapezoid extends Quadrilateral {
    constructor({ lengths = {}, height = 0, angles = {}, supplementary = {} }) {
        super();
        let vertices;

        switch (true) {
            case Object.keys(lengths).length === 4:
                vertices = this._trapezoidByLengths(lengths);
                break;
            case Object.keys(lengths).length >= 2 && height !== 0 && Object.keys(angles).length === 1:
                const angleKey = Object.keys(angles)[0];
                this._isAngleInDegree = angles.angleInDegree || false;
                const angleInRadians = this._isAngleInDegree ? degreesToRadians(angles[angleKey]) : angles[angleKey];
                vertices = this._trapezoidByTwoBasesHeightAngle(lengths, height, angleKey, angleInRadians);
                break;
            default:
                throw new Error(`Invalid combination of parameters: ${JSON.stringify({ lengths, angles })}`);
        }

        [this._pointA, this._pointB, this._pointC, this._pointD] = vertices;
        this._vertices = vertices.map((vertex) => shiftCoordinate2D(vertex, this.diagonalIntersectionPoint));
        [this._pointA, this._pointB, this._pointC, this._pointD] = this._vertices;

        this.#setAngles();
        this.addFace(this._vertices);

        const {
            calculateDiagonals = false,
            calculateHeights = false,
        } = supplementary;

        if (calculateDiagonals) {
            this._setDiagonals();
        }

        if (calculateHeights) {
            this._setHeights();
        }
    }

    #setAngles() {
            this._angleAInRadians = new Angle(this._pointB, this._pointA, this._pointD).angleInRadians;
            this._angleBInRadians = new Angle(this._pointA, this._pointB, this._pointC).angleInRadians;
            this._angleCInRadians = new Angle(this._pointB, this._pointC, this._pointD).angleInRadians;
            this._angleDInRadians = new Angle(this._pointA, this._pointD, this._pointC).angleInRadians;
    }

    _trapezoidByLengths(lengths) {
        Object.keys(lengths).forEach((key) => {
            if (!['lengthAB', 'lengthBC', 'lengthCD', 'lengthDA'].includes(key))
                throw new Error(`Four lengths are not defined. ${JSON.stringify(lengths)}`);
            if (!Number.isFinite(Number(lengths[key])))
                throw new Error(`length is not positive numeric value. ${key}: ${lengths[key]}`);
        });
        
        const { lengthAB, lengthBC, lengthCD, lengthDA} = lengths;

        if (Math.abs(lengthDA - lengthBC) > Math.abs(lengthAB - lengthCD))
            throw new Error(`The sides do not form a trapezoid. |${lengthDA}-${lengthBC}|>|${lengthAB}-${lengthCD}|`);

        const A = new Point(0, 0);
        const B = new Point(lengthAB, 0);

        let h = this._calculateTrapezoidHeight(lengthAB, lengthBC, lengthCD, lengthDA);

        const x = (Math.pow(lengthAB - lengthCD, 2) - Math.pow(lengthBC, 2) + Math.pow(lengthDA, 2)) / (2 * (lengthAB - lengthCD));

        const D = new Point(x, h);
        const C = new Point(x + lengthCD, h);

        return [A, B, C, D];
    }

    _calculateTrapezoidHeight(lengthAB, lengthBC, lengthCD, lengthDA) {
        const baseDifference = (lengthAB - lengthCD);
        let DA2 = Math.pow(lengthDA, 2)
        let baseDifference2 = Math.pow(baseDifference, 2);
        let BC2 = Math.pow(lengthBC, 2)
    
        return Math.sqrt(DA2 - Math.pow((baseDifference2+DA2-BC2)/(2*baseDifference), 2));
    }

    _trapezoidByTwoBasesHeightAngle(lengths, height, angleKey, angleInRadians) {
        const { lengthAB, lengthCD} = lengths;
        
        if (!lengthAB || !Number.isFinite(lengthAB) || lengthAB <= 0) {
            throw new Error(`Base AB must be a positive numeric value: ${lengthAB}`);
        }
        
        if (!lengthCD || !Number.isFinite(lengthCD) || lengthCD <= 0) {
            throw new Error(`Base CD must be a positive numeric value: ${lengthCD}`);
        }
        
        if (!Number.isFinite(height) || height <= 0) {
            throw new Error(`Height must be a positive numeric value: ${height}`);
        }
        
        if (!['angleA', 'angleB', 'angleC', 'angleD'].includes(angleKey)) {
            throw new Error(`Invalid angle key: ${angleKey}`);
        }
        
        if (!Number.isFinite(angleInRadians)) {
            throw new Error(`Angle must be a numeric value: ${angleKey}`);
        }
        
        // Create trapezoid points
        const A = new Point(0, 0);
        const B = new Point(lengthAB, 0);
        
        // Calculate x-offset for the top base CD
        let xOffset;
        
        switch (angleKey) {
            case 'angleA':
                // If angle A is known, calculate offset based on height and angle
                xOffset = height / Math.tan(angleInRadians);
                break;
            case 'angleB':
                // If angle B is known, calculate offset from the right side
                xOffset = lengthAB - (height / Math.tan(angleInRadians));
                break;
            case 'angleC':
                // If angle C is known, calculate offset from the right side
                xOffset = lengthAB - (height / Math.tan(Math.PI - angleInRadians));
                break;
            case 'angleD':
                // If angle D is known, calculate offset from the left side
                xOffset = height / Math.tan(Math.PI - angleInRadians);
                break;
            default:
                // Default case - center the top base
                xOffset = (lengthAB - lengthCD) / 2;
        }
        
        const D = new Point(xOffset, height);
        const C = new Point(xOffset + lengthCD, height);
                
        return [A, B, C, D];
    }
}
