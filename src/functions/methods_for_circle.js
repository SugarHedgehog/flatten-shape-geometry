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