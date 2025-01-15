import {Polygon } from '@flatten-js/core';

export default class ShapeWithConnectionMatrix extends Polygon {
    connectionMatrix = [];
    vertices = [];
    constructor() {  
        super();
    }

    addVertexToConnectionMatrix(points, type) {
            if (!Array.isArray(points)) {
                points = [points];
            }
            points.forEach(point => {
                if (point.x === undefined || point.y === undefined) {
                    throw new Error("Each point must have x and y coordinates");
                }
            });
            this.vertices.push(...points);
            if (type !== undefined) {
                if (!Array.isArray(type)) {
                    type = [type];
                }
                if (points.length > 1 && type.length === 1 && type[0] !== 'S') {
                    type = Array(points.length).fill(type[0]);
                }
                type.forEach(typeABC => {
                    this.connectionMatrix.push(new Array(this.connectionMatrix.length + 1).fill(0));
                    switch (typeABC) {
                        case 'A':
                            this.connectVerticesInConnectionMatrix([0, this.connectionMatrix.length]);
                            break;
                        case 'B':
                            this.connectVerticesInConnectionMatrix([1, this.connectionMatrix.length]);
                            break;
                        case 'C':
                            this.connectVerticesInConnectionMatrix([2, this.connectionMatrix.length]);
                            break;
                        case 'S':
                            this.connectVerticesInConnectionMatrix([this.connectionMatrix.length, this.connectionMatrix.length - 1]);
                            break;
                        case 'E':
                            break;
                        default:
                            throw new Error("Invalid type specified. Available types are 'A', 'B', 'C', 'S', 'E'. " + typeABC);
                    }
                });
            }
        }
    
        connectVerticesInConnectionMatrix(vertexPairs) {
            if (!Array.isArray(vertexPairs[0])) {
                vertexPairs = [vertexPairs];
            }
            vertexPairs.forEach(pair => {
                if (!Array.isArray(pair) || pair.length !== 2) {
                    throw new Error("Each element in the array should be an array with exactly two vertex indices.");
                }
                let [index1, index2] = pair;
                if (index1 < index2) {
                    [index1, index2] = [index2, index1];
                }
                if (index1 < 0 || index2 < 0 || index1 >= this.vertices.length || index2 >= this.vertices.length) {
                    throw new Error("Vertex indices are out of bounds.");
                }
                this.connectionMatrix[index1 - 1][index2] = 1;
            });
        }
    
        connectVerticesCyclicInConnectionMatrix(vertexPairs) {
            if (!Array.isArray(vertexPairs[0])) {
                vertexPairs = [vertexPairs];
            }
        
            vertexPairs.forEach(subArray => {
                if (subArray.length > 2) {
                    const pairs = [];
                    for (let i = 0; i < subArray.length; i++) {
                        for (let j = i + 1; j < subArray.length; j++) {
                            pairs.push([subArray[i], subArray[j]]);
                        }
                    }
                    subArray.length = 0;
                    subArray.push(...pairs);
                }
                subArray.forEach(pair => {
                    this.connectVerticesInConnectionMatrix(pair);
                });
            });
        }
}