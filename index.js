import 'core-js/stable';
import 'regenerator-runtime/runtime';
import {isValidTriangle, calculateThirdSideUsingCosineLaw} from './src/functions/general' 
import Angle from './src/shape/Angle';
import Triangle from './src/shape/Triangle';
import Square from './src/shape/Square';
import Rectangle from './src/shape/Rectangle';
import Rhombus from './src/shape/Rhombus';
import Parallelogram from './src/shape/Parallelogram';

window.isValidTriangle = isValidTriangle;
window.calculateThirdSideUsingCosineLaw = calculateThirdSideUsingCosineLaw;
window.Angle = Angle;
window.Triangle = Triangle;
window.Square = Square;
window.Rectangle = Rectangle;
window.Rhombus = Rhombus;
window.Parallelogram = Parallelogram;
