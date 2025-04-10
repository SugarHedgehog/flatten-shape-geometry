import { Circle, Point, Segment } from '@flatten-js/core';
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

