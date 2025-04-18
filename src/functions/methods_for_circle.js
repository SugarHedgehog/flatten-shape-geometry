import { Circle, Point, Segment, Vector } from '@flatten-js/core';
import degreesToRadians from 'degrees-radians';

Circle.prototype.pointOnCircle = function (angle, {angleInDegrees = false, counterclockwise = false} = {}) {
    if (typeof angle !== 'number' || Number.isNaN(angle)) {
        throw new Error("Angle must be a number");
    }

    angle = angleInDegrees ? degreesToRadians(angle) : angle;

    if (Math.abs(angle) > 2 * Math.PI) {
        throw new Error(`The angle is greater than 2 pi`);
    }

    if(counterclockwise){
        angle *= -1;
    }

    return new Point(
        this.r * Math.cos(angle) + this.pc.x,
        this.r * Math.sin(angle) + this.pc.y
    );
}

Circle.prototype.radius = function (angle, {angleInDegrees = false, counterclockwise = false} = {}) {
    return new Segment(this.pc, this.pointOnCircle(angle, {angleInDegrees, counterclockwise}))
}

Circle.prototype.diameter = function(angle, {angleInDegrees = false, counterclockwise = false} = {}) {
    const startPoint = this.pointOnCircle(angle, {angleInDegrees, counterclockwise});
    const oppositeAngle = angle + (angleInDegrees ? 180 : Math.PI);
    const endPoint = this.pointOnCircle(oppositeAngle, {
        angleInDegrees,
        counterclockwise
    });

    return new Segment(startPoint, endPoint);
};

Circle.prototype.chordByAngles = function(startAngle, endAngle, {angleInDegrees = false, counterclockwise = false} = {}) {
    if (startAngle == endAngle) {
        throw new Error("The angles must not match");
    }

    const startPoint = this.pointOnCircle(startAngle, {angleInDegrees, counterclockwise});
    const endPoint = this.pointOnCircle(endAngle, {angleInDegrees, counterclockwise});

    return new Segment(startPoint, endPoint);
};

Circle.prototype.tangentPointsFromPoint = function(point) {
    if (!(point instanceof Point)) {
        throw new TypeError("First argument must be a Point instance");
    }

    const circle = this;
    const center = circle.center;
    const radius = circle.r;
    
    const distanceToCenter = center.distanceTo(point)[0];

    if (distanceToCenter <= radius) {
        throw new Error("Point must be outside the circle");
    }

    const vecToPoint = new Vector(center, point);
    const d = vecToPoint.length;
    
    const angle = Math.acos(radius / d);
    
    const rotatedVec1 = vecToPoint.rotate(angle).normalize();
    const rotatedVec2 = vecToPoint.rotate(-angle).normalize();
    
    let tangentPoint1 = center.translate(rotatedVec1.multiply(radius));
    let tangentPoint2 = center.translate(rotatedVec2.multiply(radius));
    
    return [tangentPoint1, tangentPoint2];
};

Circle.prototype.tangentsFromPoint = function(point, {segmentLength = 0}={}) {
    if (!(point instanceof Point)) {
        throw new TypeError("First argument must be a Point instance");
    }

    if (typeof segmentLength !== 'number' || segmentLength < 0) {
        throw new Error("segmentLength must be a non-negative number");
    }

    const tangentPoints = this.tangentPointsFromPoint(point);
    let tangentPoint1 = tangentPoints[0];
    let tangentPoint2 = tangentPoints[1];

    if (segmentLength > 0) {
        const vector1 = new Vector(point, tangentPoint1).normalize();
        const vector2 = new Vector(point, tangentPoint2).normalize();
        
        tangentPoint1 = point.translate(vector1.multiply(segmentLength));
        tangentPoint2 = point.translate(vector2.multiply(segmentLength));
    }
    
    return [
       [tangentPoints[0], new Segment(tangentPoint1, point)],
       [tangentPoints[1], new Segment(tangentPoint2, point)]
    ];
};

