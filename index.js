import 'core-js/stable';
import 'regenerator-runtime/runtime';
import {Point, Vector, Circle, Line, Ray, Segment, Arc, Box, Polygon, Matrix, PlanarSet} from '@flatten-js/core'; 
import {isValidTriangle, calculateThirdSideUsingCosineLaw, bisectorIntersection} from './src/functions/general'
import './src/functions/methods_for_circle';  
import Angle from './src/shape/Angle';
import Triangle from './src/shape/Triangle';
import Square from './src/shape/Square';
import Rectangle from './src/shape/Rectangle';
import Rhombus from './src/shape/Rhombus';
import Parallelogram from './src/shape/Parallelogram';
import Trapezoid from './src/shape/Trapezoid';

window.Point = Point;
window.Vector = Vector;
window.Circle = Circle;
window.Line = Line;
window.Ray = Ray;
window.Segment = Segment;
window.Arc = Arc;
window.Box = Box;
window.Polygon = Polygon;
window.Matrix = Matrix;
window.PlanarSet = PlanarSet;
window.isValidTriangle = isValidTriangle;
window.calculateThirdSideUsingCosineLaw = calculateThirdSideUsingCosineLaw;
window.bisectorIntersection = bisectorIntersection;
window.Angle = Angle;
window.Triangle = Triangle;
window.Square = Square;
window.Rectangle = Rectangle;
window.Rhombus = Rhombus;
window.Parallelogram = Parallelogram;
window.Trapezoid = Trapezoid;

