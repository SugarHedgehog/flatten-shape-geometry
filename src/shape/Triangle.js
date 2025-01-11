import { Point, Segment } from '@flatten-js/core';
import degreesToRadians from 'degrees-radians';
import radiansToDegrees from 'radians-degrees';
import { subtract, dot, multiply, add } from 'mathjs';
import Shape from '../shape/Shape';
import Angle from '../shape/Angle'
import { isValidTriangle, calculateThirdSideUsingCosineLaw } from '../fuctions/general.js'

/**
 * The constructor of the `Triangle` class initializes a triangle object using the provided parameters.
 * 
 * The constructor supports three ways to create a triangle:
 * 
 * 1) By the coordinates of the triangle's vertices - you need to provide `points: [{x,y}, {x,y}, {x,y}]`.
 * 
 * 2) By its three sides - you need to provide `lengths: {lengthAB, lengthBC, lengthCA}`.
 * 
 * 3) By two sides and an angle - you need to provide any two sides of the triangle and the angle between them, for example, `lengths: {lengthAB, lengthBC}`, `angles: {angle: {angleA, angleB, angleC}}`.
 *  
 * @param {Object} params - An object with parameters for creating a triangle.
 * @param {Array} params.points - An array of three `Point` objects representing the vertices of the triangle with `x` and `y` coordinates.
 * 
 * @param {Object} params.lengths - An object containing the lengths of the triangle's sides.
 * @param {number} params.lengths.lengthAB - Length of side AB.
 * @param {number} params.lengths.lengthBC - Length of side BC.
 * @param {number} params.lengths.lengthCA - Length of side CA.
 * 
 * @param {Object} params.angles - An object containing the angles of the triangle and a flag indicating whether the angles are in radians or degrees `angle: {angleA, angleB, angleC}`.
 * @param {number} params.angles.angleA - Angle A.
 * @param {number} params.angles.angleB - Angle B.
 * @param {number} params.angles.angleC - Angle C.
 * @param {boolean} params.angles.angleInDegree - A flag indicating whether the angles are in degrees. If `true`, the angles will be converted to radians.
 * 
 * @param {Object} params.supplementary - An object with flags for calculating additional characteristics of the triangle.
 * @param {boolean} params.supplementary.calculateMedians - Flag for calculating the medians of the triangle.
 * @param {boolean} params.supplementary.calculateHeights - Flag for calculating the heights of the triangle.
 * @param {boolean} params.supplementary.calculateBisectors - Flag for calculating the bisectors of the triangle.
 * @param {boolean} params.supplementary.calculateMidlines - Flag for calculating the midlines of the triangle.
 * 
 * Class methods:
 * - `#createFromPoints(pointA, pointB, pointC)`: creates a triangle from three points.
 * - `#createFromSideLengths(sideAB, sideBC, sideCA)`: creates a triangle from three side lengths.
 * - `#createFromTwoSidesAndAngle(lengths, angleBetween)`: creates a triangle from two sides and the angle between them.
 * - `#setAngles()`: sets the angles of the triangle in radians and degrees.
 * - `addVertex(points, type)`: adds a vertex to the triangle.
 * - `connectVertices(vertexPairs)`: connects the vertices of the triangle.
 * - `connectVerticesCyclic(vertexPairs)`: cyclically connects the vertices of the triangle.
 * - `#calculateMedians()`: calculates the medians of the triangle.
 * - `#calculateHeights()`: calculates the heights of the triangle.
 * - `#calculateBisectors()`: calculates the bisectors of the triangle.
 * - `#calculateMidlines()`: calculates the midlines of the triangle.
 * 
 * Class getters:
 * 
 * - `medianA`, `medianB`, `medianC`: return the medians of the triangle as `Segment` objects.
 * - `medianAPoint`, `medianBPoint`, `medianCPoint`: return the coordinates of the start and end points of the medians.
 * - `medianAEndPoint`, `medianBEndPoint`, `medianCEndPoint`: return the coordinates of the end points of the medians.
 * - `medianEndPoints`: returns an object with the coordinates of the end points of all medians.
 * - `medianALength`, `medianBLength`, `medianCLength`: return the lengths of the medians.
 * - `medianLengths`: returns an object with the lengths of all medians.
 * 
 * - `heightA`, `heightB`, `heightC`: return the heights of the triangle as `Segment` objects.
 * - `heightAEndPoint`, `heightBEndPoint`, `heightCEndPoint`: return the coordinates of the end points of the heights.
 * - `heightEndPoints`: returns an object with the coordinates of the end points of all heights.
 * - `heightALength`, `heightBLength`, `heightCLength`: return the lengths of the heights.
 * - `heightLengths`: returns an object with the lengths of all heights.
 * 
 * - `bisectorA`, `bisectorB`, `bisectorC`: return the bisectors of the triangle as `Segment` objects.
 * - `bisectorAEndPoint`, `bisectorBEndPoint`, `bisectorCEndPoint`: return the coordinates of the end points of the bisectors.
 * - `bisectorEndPoints`: returns an object with the coordinates of the end points of all bisectors.
 * - `bisectorALength`, `bisectorBLength`, `bisectorCLength`: return the lengths of the bisectors.
 * - `bisectorLengths`: returns an object with the lengths of all bisectors.
 * 
 * - `midlineABStartPoint`, `midlineBCStartPoint`, `midlineCAStartPoint`: return the coordinates of the start points of the midlines.
 * - `midlineABEndPoint`, `midlineBCEndPoint`, `midlineCAEndPoint`: return the coordinates of the end points of the midlines.
 * - `midlinePointsAB`, `midlinePointsBC`, `midlinePointsCA`: return arrays with the coordinates of the start and end points of the midlines.
 * - `midlineABLength`, `midlineBCLength`, `midlineCALength`: return the lengths of the midlines.
 * - `midlineLengths`: returns an object with the lengths of all midlines.
 * 
 * - `pointA`, `pointB`, `pointC`: return the coordinates of the triangle's vertices.
 * - `vertices`: returns an array with `Point` objects representing the vertices of the triangle.
 * 
 * - `perimeter`: returns the perimeter of the triangle.
 * - `area`: returns the area of the triangle.
 */

export default class Triangle extends Shape {
    #isAngleInDegree;
    connectionMatrix;
    vertices;
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
        const isAngleInDegree = angles.angleInDegree || false;
        const angleValues = angles.angle || {};
        const {
            calculateMedians = false,
            calculateHeights = false,
            calculateBisectors = false,
            calculateMidlines = false
        } = supplementary;

        const connectionMatrix = [
            [1],
            [1, 1],
        ];

        const { lengthAB, lengthBC, lengthCA } = lengths;

        let pointA, pointB, pointC;

        switch (true) {
            case points && points.length === 3 && points.every(p => p.x !== undefined && p.y !== undefined):
                [pointA, pointB, pointC] = points.map(p => new Point(p.x, p.y));
                break;

            case Object.keys(lengths).length == 3:
                if (Number.isFinite(Number(lengthAB)) && Number.isFinite(Number(lengthBC)) && Number.isFinite(Number(lengthCA))) {
                    [pointA, pointB, pointC] = Triangle._findTriangleVertices2D(lengthAB, lengthBC, lengthCA);
                } else {
                    throw new TypeError(`Invalid lengths: Received lengths are ${JSON.stringify(lengths)}. Please provide three numeric side lengths.`);
                }
                break;

            case Object.keys(lengths).length == 2 && Number.isFinite(Number(angleValues)):
                [pointA, pointB, pointC] = Triangle._findTriangleVertices2DFromTwoSidesAndAngle(lengths, angleValues, isAngleInDegree);
                break;

            default:
                throw new TypeError(`Invalid arguments: Received points ${JSON.stringify(points)}, lengths ${JSON.stringify(lengths)}, angleValues ${JSON.stringify(angleValues)}. Please provide either three Points, three side lengths, or two side lengths and one angle.`);
        }

        if (pointA && pointB && pointC) {
            super();
            this.addFace([pointA, pointB, pointC]);
            this.#isAngleInDegree = isAngleInDegree;
            this.connectionMatrix = connectionMatrix;
            this.#pointA = pointA;
            this.#pointB = pointB;
            this.#pointC = pointC;
            this.#lengthAB = new Segment(pointA, pointB).length;
            this.#lengthBC = new Segment(pointB, pointC).length;
            this.#lengthCA = new Segment(pointC, pointA).length;
            this.vertices = [pointA, pointB, pointC];
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

    static _findTriangleVertices2DFromTwoSidesAndAngle(lengths, angleBetween, isAngleInDegree) {
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
                side1 = lengthBC;
                side2 = lengthCA;
                side3 = calculateThirdSideUsingCosineLaw(side1, side2, angleRadians);
                break;
            case (lengthCA > 0 && lengthAB > 0):
                side1 = lengthCA;
                side2 = lengthAB;
                side3 = calculateThirdSideUsingCosineLaw(side1, side2, angleRadians);
                break;
            default:
                throw new Error("Exactly two sides must be provided");
        }

        if (!isValidTriangle(side1, side2, side3)) {
            throw new Error("The given sides and angle do not form a valid triangle");
        }

        return Triangle._findTriangleVertices2D(side1, side2, side3);
    }

    static _findTriangleVertices2D(a, b, c) {
        const A = new Point(0, 0);
        const B = new Point(a, 0);
        const angleC = Math.acos((a * a + b * b - c * c) / (2 * a * b));
        if (isNaN(angleC)) {
            throw new Error("Invalid triangle sides: Cannot calculate angle.");
        }
        const C = new Point(b * Math.cos(angleC), b * Math.sin(angleC));
        return [A, B, C];
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
        return [this.#medianA.start.coordinates, this.#medianA.end.coordinates];
    }

    get medianBPoint() {
        return [this.#medianB.start.coordinates, this.#medianB.end.coordinates];
    }

    get medianCPoint() {
        return [this.#medianC.start.coordinates, this.#medianC.end.coordinates];
    }

    get medianAEndPoint() {
        return this.#medianA.end.coordinates;
    }

    get medianBEndPoint() {
        return this.#medianB.end.coordinates;
    }

    get medianCEndPoint() {
        return this.#medianC.end.coordinates;
    }

    get medianEndPoints() {
        return {
            medianAEndPoint: this.#medianA.end.coordinates,
            medianBEndPoint: this.#medianB.end.coordinates,
            medianCEndPoint: this.#medianC.end.coordinates
        };
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

    get heightAEndPoint() {
        return this.#heightA.end.coordinates;
    }

    get heightBEndPoint() {
        return this.#heightB.end.coordinates;
    }

    get heightCEndPoint() {
        return this.#heightC.end.coordinates;
    }

    get heightEndPoints() {
        return {
            heightAEndPoint: this.#heightA.end.coordinates,
            heightBEndPoint: this.#heightB.end.coordinates,
            heightCEndPoint: this.#heightC.end.coordinates
        };
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

    get bisectorAEndPoint() {
        return this.#bisectorA.end.coordinates;
    }

    get bisectorBEndPoint() {
        return this.#bisectorB.end.coordinates;
    }

    get bisectorCEndPoint() {
        return this.#bisectorC.end.coordinates;
    }

    get bisectorEndPoints() {
        return {
            bisectorAEndPoint: this.#bisectorA.end.coordinates,
            bisectorBEndPoint: this.#bisectorB.end.coordinates,
            bisectorCEndPoint: this.#bisectorC.end.coordinates
        };
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
        return this.#midlineAB.start.coordinates;
    }

    get midlineBCStartPoint() {
        return this.#midlineBC.start.coordinates;
    }

    get midlineCAStartPoint() {
        return this.#midlineCA.start.coordinates;
    }

    get midlineABEndPoint() {
        return this.#midlineAB.end.coordinates;
    }

    get midlineBCEndPoint() {
        return this.#midlineBC.end.coordinates;
    }

    get midlineCAEndPoint() {
        return this.#midlineCA.end.coordinates;
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
        return this.#pointA.coordinates;
    }

    get pointB() {
        return this.#pointB.coordinates;
    }

    get pointC() {
        return this.#pointC.coordinates;
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

    get vertices() {
        return [this.#pointA, this.#pointB, this.#pointC];
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