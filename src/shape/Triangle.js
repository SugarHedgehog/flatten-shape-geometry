import { Point, Segment } from '@flatten-js/core';
import degreesToRadians from 'degrees-radians';
import radiansToDegrees from 'radians-degrees';
import { subtract, dot, multiply, add } from 'mathjs';
import ShapeWithConnectionMatrix from '../shape/Shape';
import Angle from '../shape/Angle'
import { isValidTriangle, calculateThirdSideUsingCosineLaw, findCircumcenter2D, shiftCoordinate2D } from '../functions/general.js'

/**
 * Represents a Triangle with various properties and methods to calculate its characteristics.
 * 
 * The `Triangle` class can be instantiated using different sets of parameters:
 * 
 * 1) By the coordinates of the triangle's vertices: `points: [{x,y}, {x,y}, {x,y}]`.
 * 2) By its three sides: `lengths: {lengthAB, lengthBC, lengthCA}`.
 * 3) By two sides and an angle: `lengths: {lengthAB, lengthBC}`, `angles: {angle: {angleA, angleB, angleC}}`.
 * 
 * @param {Object} params - Parameters for creating a triangle.
 * @param {Array} params.points - Array of three `Point` objects representing the vertices.
 * @param {Object} params.lengths - Object containing the lengths of the triangle's sides.
 * @param {Object} params.angles - Object containing the angles of the triangle and a flag for angle units.
 * @param {Object} params.supplementary - Flags for calculating additional triangle characteristics.
 * 
 * Methods:
 * - `#createFromPoints(pointA, pointB, pointC)`: Creates a triangle from three points.
 * - `#createFromSideLengths(sideAB, sideBC, sideCA)`: Creates a triangle from three side lengths.
 * - `#createFromTwoSidesAndAngle(lengths, angleBetween)`: Creates a triangle from two sides and the angle between them.
 * - `#setAngles()`: Sets the angles of the triangle in radians and degrees.
 * - `#calculateMedians()`: Calculates the medians of the triangle.
 * - `#calculateHeights()`: Calculates the heights of the triangle.
 * - `#calculateBisectors()`: Calculates the bisectors of the triangle.
 * - `#calculateMidlines()`: Calculates the midlines of the triangle.
 * 
 * Getters:
 * - `medianA`, `medianB`, `medianC`: Return the medians as `Segment` objects.
 * - `heightA`, `heightB`, `heightC`: Return the heights as `Segment` objects.
 * - `bisectorA`, `bisectorB`, `bisectorC`: Return the bisectors as `Segment` objects.
 * - `midlineABStartPoint`, `midlineBCStartPoint`, `midlineCAStartPoint`: Return start points of the midlines.
 * - `midlineABEndPoint`, `midlineBCEndPoint`, `midlineCAEndPoint`: Return end points of the midlines.
 * - `angleAInRadians`, `angleBInRadians`, `angleCInRadians`: Return angles in radians.
 * - `angleAInDegrees`, `angleBInDegrees`, `angleCInDegrees`: Return angles in degrees.
 * - `pointA`, `pointB`, `pointC`: Return the coordinates of the vertices.
 * - `lengthAB`, `lengthBC`, `lengthCA`: Return the lengths of the sides.
 * - `perimeter`: Returns the perimeter of the triangle.
 * - `radiusOfCircumscribedCircle`: Returns the circumradius.
 * - `radiusOfInscribedCircle`: Returns the inradius.
 * - `sinA`, `cosA`, `tgA`, `ctgA`: Trigonometric functions for angle A.
 * - `sinB`, `cosB`, `tgB`, `ctgB`: Trigonometric functions for angle B.
 * - `sinC`, `cosC`, `tgC`, `ctgC`: Trigonometric functions for angle C.
 */

export default class Triangle extends ShapeWithConnectionMatrix {
    #isAngleInDegree;
    _connectionMatrix;
    _vertices;
    #pointA;
    #pointB;
    #pointC;
    #lengthAB;
    #lengthBC;
    #lengthCA;
    #medianA;
    #medianB;
    #medianC;
    #heightA;
    #heightB;
    #heightC;
    #bisectorA;
    #bisectorB;
    #bisectorC;
    #midlineAB;
    #midlineBC;
    #midlineCA;
    #angleAInDegrees;
    #angleBInDegrees;
    #angleCInDegrees;
    #angleAInRadians;
    #angleBInRadians;
    #angleCInRadians;

    constructor({ points = [], lengths = {}, angles = {}, supplementary = {} }) {
        super();
        this.#isAngleInDegree = angles.angleInDegree || false;
        const angleValues = angles.angle || {};
        const {
            calculateMedians = false,
            calculateHeights = false,
            calculateBisectors = false,
            calculateMidlines = false
        } = supplementary;

        this._connectionMatrix = [
            [1],
            [1, 1],
        ];

        const { lengthAB, lengthBC, lengthCA } = lengths;

        switch (true) {
            case points && points.length === 3 && points.every(p => Number.isFinite(p.x) && Number.isFinite(p.y)):                [this.#pointA, this.#pointB, this.#pointC] = points.map(p => new Point(p.x, p.y));
                let circumcenter = findCircumcenter2D(this.#pointA, this.#pointB, this.#pointC);
                [this.#pointA, this.#pointB, this.#pointC] = [this.#pointA, this.#pointB, this.#pointC].map(vertex => shiftCoordinate2D(vertex, circumcenter));
                break;

            case Object.keys(lengths).length == 3:
                if (Number.isFinite(Number(lengthAB)) && Number.isFinite(Number(lengthBC)) && Number.isFinite(Number(lengthCA))) {
                    [this.#pointA, this.#pointB, this.#pointC] = this.findTriangleVertices2D(lengthAB, lengthCA, lengthBC);
                } else {
                    throw new TypeError(`Invalid lengths: Received lengths are ${JSON.stringify(lengths)}. Please provide three numeric side lengths.`);
                }
                break;

            case Object.keys(lengths).length == 2 && Number.isFinite(Number(angleValues)):
                [this.#pointA, this.#pointB, this.#pointC] = this.findTriangleVertices2DFromTwoSidesAndAngle(lengths, angleValues, this.#isAngleInDegree);
                break;

            default:
                throw new TypeError(`Invalid arguments: Received points ${JSON.stringify(points)}, lengths ${JSON.stringify(lengths)}, angleValues ${JSON.stringify(angleValues)}. Please provide either three Points, three side lengths, or two side lengths and one angle.`);
        }

        if (this.#pointA && this.#pointB && this.#pointC) {
            this.addFace([this.#pointA, this.#pointB, this.#pointC]);
            this.#lengthAB = new Segment(this.#pointA, this.#pointB).length;
            this.#lengthBC = new Segment(this.#pointB, this.#pointC).length;
            this.#lengthCA = new Segment(this.#pointC, this.#pointA).length;
            this._vertices = [this.#pointA, this.#pointB, this.#pointC];
            this.#setAngles();
            if (calculateMedians) {
                this.#calculateMedians();
            }
            if (calculateHeights) {
                this.#calculateHeights();
            }
            if (calculateBisectors) {
                this.#calculateBisectors();
            }
            if (calculateMidlines) {
                this.#calculateMidlines();
            }
        } else {
            throw new Error("Points A, B, and C must be initialized before creating a polygon.");
        }
    }

    findTriangleVertices2DFromTwoSidesAndAngle(lengths, angleBetween, isAngleInDegree) {
        if (Object.keys(lengths).length !== 2 || angleBetween <= 0 || angleBetween >= (isAngleInDegree ? 180 : Math.PI)) {
            throw new Error("Invalid input: Provide exactly two side lengths and an angle between 0 and 180 degrees or 0 and π radians.");
        }
        const { lengthAB, lengthBC, lengthCA } = lengths;
        const angleRadians = isAngleInDegree ? degreesToRadians(angleBetween) : angleBetween;

        let side1, side2, side3;

        switch (true) {
            case (lengthAB > 0 && lengthBC > 0):
                side1 = lengthAB;
                side2 = lengthBC;
                side3 = calculateThirdSideUsingCosineLaw(side1, side2, angleRadians);
                break;
            case (lengthBC > 0 && lengthCA > 0):
                side2 = lengthBC;
                side3 = lengthCA;
                side1 = calculateThirdSideUsingCosineLaw(side2, side3, angleRadians);
                break;
            case (lengthCA > 0 && lengthAB > 0):
                side1 = lengthAB;
                side3 = lengthCA;
                side2 = calculateThirdSideUsingCosineLaw(side1, side3, angleRadians);
                break;
            default:
                throw new Error("Exactly two sides must be provided");
        }

        if (!isValidTriangle(side1, side2, side3)) {
            throw new Error("The given sides and angle do not form a valid triangle");
        }

        return this.findTriangleVertices2D(side1,side3, side2);
    }

    findTriangleVertices2D(a, b, c) {
        const A = new Point(0, 0);
        const B = new Point(a, 0);
        const angleC = Math.acos((a * a + b * b - c * c) / (2 * a * b));
        if (isNaN(angleC)) {
            throw new Error("Invalid triangle sides: Cannot calculate angle.");
        }
        const C = new Point(b * Math.cos(angleC), b * Math.sin(angleC));

        let circumcenter = findCircumcenter2D(A, B, C);
        return [A, B, C].map(vertex => shiftCoordinate2D(vertex, circumcenter));
    }

    #setAngles() {
        if (this.#isAngleInDegree) {
            this.#angleAInDegrees = new Angle(this.#pointB, this.#pointA, this.#pointC).angleInDegrees;
            this.#angleBInDegrees = new Angle(this.#pointA, this.#pointB, this.#pointC).angleInDegrees;
            this.#angleCInDegrees = new Angle(this.#pointA, this.#pointC, this.#pointB).angleInDegrees;
            this.#angleAInRadians = degreesToRadians(this.#angleAInDegrees);
            this.#angleBInRadians = degreesToRadians(this.#angleBInDegrees);
            this.#angleCInRadians = degreesToRadians(this.#angleCInDegrees);
        } else {
            this.#angleAInRadians = new Angle(this.#pointB, this.#pointA, this.#pointC).angleInRadians;
            this.#angleBInRadians = new Angle(this.#pointA, this.#pointB, this.#pointC).angleInRadians;
            this.#angleCInRadians = new Angle(this.#pointA, this.#pointC, this.#pointB).angleInRadians;
            this.#angleAInDegrees = radiansToDegrees(this.#angleAInRadians);
            this.#angleBInDegrees = radiansToDegrees(this.#angleBInRadians);
            this.#angleCInDegrees = radiansToDegrees(this.#angleCInRadians);
        }
    }

    #calculateMedians() {
        const midPointBC = new Segment(this.#pointB, this.#pointC).middle();
        const midPointCA = new Segment(this.#pointC, this.#pointA).middle();
        const midPointAB = new Segment(this.#pointA, this.#pointB).middle();

        this.#medianA = new Segment(this.#pointA, midPointBC);
        this.#medianB = new Segment(this.#pointB, midPointCA);
        this.#medianC = new Segment(this.#pointC, midPointAB);
    }

    get medianA() {
        return this.#medianA;
    }

    get medianB() {
        return this.#medianB;
    }

    get medianC() {
        return this.#medianC;
    }

    get medianAPoint() {
        return [this.medianA.ps, this.medianA.pe];
    }

    get medianBPoint() {
        return [this.medianB.ps, this.medianB.pe];
    }

    get medianCPoint() {
        return [this.medianC.ps, this.medianC.pe];
    }

    get medianAEndPoint() {
        return this.medianA.pe;
    }

    get medianBEndPoint() {
        return this.medianB.pe;
    }

    get medianCEndPoint() {
        return this.medianC.pe;
    }

    get medianEndPoints() {
        return {
            medianAEndPoint: this.medianAEndPoint,
            medianBEndPoint: this.medianBEndPoint,
            medianCEndPoint: this.medianCEndPoint
        };
    }

    get medianIntersectionPoint() {
        return this.#medianA.intersect(this.#medianB)[0];
    }

    get medianALength() {
        return this.#medianA.length;
    }

    get medianBLength() {
        return this.#medianB.length;
    }

    get medianCLength() {
        return this.#medianC.length;
    }

    get medianLengths() {
        return {
            medianALength: this.medianALength,
            medianBLength: this.medianBLength,
            medianCLength: this.medianCLength,
        };
    }

    #calculateHeights() {
        const footA = this._calculateFootOfPerpendicular(this.#pointA, new Segment(this.#pointB, this.#pointC));
        const footB = this._calculateFootOfPerpendicular(this.#pointB, new Segment(this.#pointC, this.#pointA));
        const footC = this._calculateFootOfPerpendicular(this.#pointC, new Segment(this.#pointA, this.#pointB));

        this.#heightA = new Segment(this.#pointA, footA);
        this.#heightB = new Segment(this.#pointB, footB);
        this.#heightC = new Segment(this.#pointC, footC);
    }

    _calculateFootOfPerpendicular(point, side) {
        const x1 = side.start.x;
        const y1 = side.start.y;
        const x2 = side.end.x;
        const y2 = side.end.y;
        const x0 = point.x;
        const y0 = point.y;

        // Create vectors using math.js
        const lineVector = subtract([x2, y2], [x1, y1]);
        const pointVector = subtract([x0, y0], [x1, y1]);

        // Project pointVector onto lineVector
        const lineLengthSquared = dot(lineVector, lineVector);
        const projectionFactor = dot(pointVector, lineVector) / lineLengthSquared;
        const projection = multiply(lineVector, projectionFactor);

        // Calculate the foot of the perpendicular
        const foot = add([x1, y1], projection);

        return new Point(foot[0], foot[1]);
    }

    get heightA() {
        return this.#heightA;
    }

    get heightB() {
        return this.#heightB;
    }

    get heightC() {
        return this.#heightC;
    }

    get heightAPoint() {
        return [this.#heightA.ps, this.#heightA.pe];
    }

    get heightBPoint() {
        return [this.#heightB.ps, this.#heightB.pe];
    }

    get heightCPoint() {
        return [this.#heightC.ps, this.#heightC.pe];
    }

    get heightAEndPoint() {
        return this.#heightA.pe;
    }

    get heightBEndPoint() {
        return this.#heightB.pe;
    }

    get heightCEndPoint() {
        return this.#heightC.pe;
    }

    get heightEndPoints() {
        return {
            heightAEndPoint: this.#heightA.pe,
            heightBEndPoint: this.#heightB.pe,
            heightCEndPoint: this.#heightC.pe
        };
    }

    get heightIntersectionPoint() {
        return this.#heightA.intersect(this.#heightB)[0];
    }

    get heightALength() {
        return this.#heightA.length;
    }

    get heightBLength() {
        return this.#heightB.length;
    }

    get heightCLength() {
        return this.#heightC.length;
    }

    get heightLengths() {
        return {
            heightALength: this.heightALength,
            heightBLength: this.heightBLength,
            heightCLength: this.heightCLength,
        };
    }

    #calculateBisectors() {
        this.#bisectorA = this._calculateBisector(this.#pointA, new Segment(this.#pointB, this.#pointC));
        this.#bisectorB = this._calculateBisector(this.#pointB, new Segment(this.#pointC, this.#pointA));
        this.#bisectorC = this._calculateBisector(this.#pointC, new Segment(this.#pointA, this.#pointB));
    }

    _calculateBisector(vertex, oppositeSide) {
        const { start, end } = oppositeSide;
        const lengthAdjacent1 = new Segment(vertex, start).length;
        const lengthAdjacent2 = new Segment(vertex, end).length;

        const px = (lengthAdjacent1 * end.x + lengthAdjacent2 * start.x) / (lengthAdjacent1 + lengthAdjacent2);
        const py = (lengthAdjacent1 * end.y + lengthAdjacent2 * start.y) / (lengthAdjacent1 + lengthAdjacent2);

        return new Segment(vertex, new Point(px, py));
    }

    get bisectorA() {
        return this.#bisectorA;
    }

    get bisectorB() {
        return this.#bisectorB;
    }

    get bisectorC() {
        return this.#bisectorC;
    }

    get bisectorAPoint() {
        return [this.#bisectorA.ps, this.#bisectorA.pe];
    }

    get bisectorBPoint() {
        return [this.#bisectorB.ps, this.#bisectorB.pe];
    }

    get bisectorCPoint() {
        return [this.#bisectorC.ps, this.#bisectorC.pe];
    }

    get bisectorAEndPoint() {
        return this.#bisectorA.pe;
    }

    get bisectorBEndPoint() {
        return this.#bisectorB.pe;
    }

    get bisectorCEndPoint() {
        return this.#bisectorC.pe;
    }

    get bisectorEndPoints() {
        return {
            bisectorAEndPoint: this.#bisectorA.pe,
            bisectorBEndPoint: this.#bisectorB.pe,
            bisectorCEndPoint: this.#bisectorC.pe
        };
    }

    get bisectorIntersectionPoint() {
        return this.#bisectorA.intersect(this.#bisectorB)[0];
    }

    get bisectorALength() {
        return this.#bisectorA.length;
    }

    get bisectorBLength() {
        return this.#bisectorB.length;
    }

    get bisectorCLength() {
        return this.#bisectorC.length;
    }

    get bisectorLengths() {
        return {
            bisectorALength: this.bisectorALength,
            bisectorBLength: this.bisectorBLength,
            bisectorCLength: this.bisectorCLength,
        };
    }

    #calculateMidlines() {
        const midPointAB = new Segment(this.#pointA, this.#pointB).middle();
        const midPointBC = new Segment(this.#pointB, this.#pointC).middle();
        const midPointCA = new Segment(this.#pointC, this.#pointA).middle();

        this.#midlineAB = new Segment(midPointBC, midPointCA);
        this.#midlineBC = new Segment(midPointCA, midPointAB);
        this.#midlineCA = new Segment(midPointAB, midPointBC);
    }

    get midlineABStartPoint() {
        return this.#midlineAB.ps;
    }

    get midlineBCStartPoint() {
        return this.#midlineBC.ps;
    }

    get midlineCAStartPoint() {
        return this.#midlineCA.ps;
    }

    get midlineABEndPoint() {
        return this.#midlineAB.pe;
    }

    get midlineBCEndPoint() {
        return this.#midlineBC.pe;
    }

    get midlineCAEndPoint() {
        return this.#midlineCA.pe;
    }

    get midlinePointsAB() {
        return [this.midlineABStartPoint, this.midlineABEndPoint];
    }

    get midlinePointsBC() {
        return [this.midlineBCStartPoint, this.midlineBCEndPoint];
    }

    get midlinePointsCA() {
        return [this.midlineCAStartPoint, this.midlineCAEndPoint];
    }

    get midlineABLength() {
        return this.#midlineAB.length;
    }

    get midlineBCLength() {
        return this.#midlineBC.length;
    }

    get midlineCALength() {
        return this.#midlineCA.length;
    }

    get midlineLengths() {
        return {
            midlineABLength: this.midlineABLength,
            midlineBCLength: this.midlineBCLength,
            midlineCALength: this.midlineCALength,
        };
    }

    get angleAInRadians() {
        return this.#angleAInRadians;
    }

    get angleBInRadians() {
        return this.#angleBInRadians;
    }

    get angleCInRadians() {
        return this.#angleCInRadians;
    }

    get angleAInDegrees() {
        return this.#angleAInDegrees;
    }

    get angleBInDegrees() {
        return this.#angleBInDegrees;
    }

    get angleCInDegrees() {
        return this.#angleCInDegrees;
    }

    get pointA() {
        return this.#pointA.vertices;
    }

    get pointB() {
        return this.#pointB.vertices;
    }

    get pointC() {
        return this.#pointC.vertices;
    }

    get lengthAB() {
        return this.#lengthAB;
    }

    get lengthBC() {
        return this.#lengthBC;
    }

    get lengthCA() {
        return this.#lengthCA;
    }

    get lengths() {
        return {
            lengthAB: this.lengthAB,
            lengthBC: this.lengthBC,
            lengthCA: this.lengthCA
        };
    }

    get connectionMatrix() {
        return this.connectionMatrix;
    }

    set connectionMatrix(connectionMatrix) {
        this.connectionMatrix = connectionMatrix;
    }

    get perimeter() {
        return this.lengthAB + this.lengthBC + this.lengthCA;
    }

    get semiperimeter() {
        return this.perimeter / 2;
    }

    get radiusOfCircumscribedCircle() {
        const area = this.area();
        if (area === 0) {
            throw new Error("The area of the triangle is zero, circumradius cannot be calculated.");
        }
        return (this.lengthAB * this.lengthBC * this.lengthCA) / (4 * area);
    }

    get radiusOfInscribedCircle() {
        const area = this.area();
        const semiperimeter = this.semiperimeter;
        if (semiperimeter === 0) {
            throw new Error("The semiperimeter of the triangle is zero, inradius cannot be calculated.");
        }
        return area / semiperimeter;
    }

    get sinA() {
        return Math.sin(this.#angleAInRadians);
    }

    get cosA() {
        return Math.cos(this.#angleAInRadians);
    }

    get tgA() {
        return Math.tan(this.#angleAInRadians);
    }

    get ctgA() {
        return 1 / this.tgA;
    }

    get sinB() {
        return Math.sin(this.#angleBInRadians);
    }

    get cosB() {
        return Math.cos(this.#angleBInRadians);
    }

    get tgB() {
        return Math.tan(this.#angleBInRadians);
    }

    get ctgB() {
        return 1 / this.tgB;
    }

    get sinC() {
        return Math.sin(this.#angleCInRadians);
    }

    get cosC() {
        return Math.cos(this.#angleCInRadians);
    }

    get tgC() {
        return Math.tan(this.#angleCInRadians);
    }

    get ctgC() {
        return 1 / this.tgC;
    }

}