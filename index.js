import 'core-js/stable';
import 'regenerator-runtime/runtime';
import {isValidTriangle, calculateThirdSideUsingCosineLaw} from './src/fuctions/general' 
import Angle from './src/shape/Angle';
import Triangle from './src/shape/Triangle';

window.isValidTriangle = isValidTriangle;
window.calculateThirdSideUsingCosineLaw = calculateThirdSideUsingCosineLaw;
window.Angle = Angle;
window.Triangle = Triangle;