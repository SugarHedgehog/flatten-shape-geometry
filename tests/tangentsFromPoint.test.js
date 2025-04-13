import { Circle, Point, Segment } from '@flatten-js/core';
import '../src/functions/methods_for_circle.js';

describe('Circle tangentsFromPoint tests', () => {
  test('should return two tangent segments for point outside circle', () => {
    const circle = new Circle(new Point(0, 0), 5);
    const point = new Point(6, 8); // Измененная тестовая точка
    
    const tangents = circle.tangentsFromPoint(point);
    
    expect(tangents).toHaveLength(2);
    expect(tangents[0]).toBeInstanceOf(Segment);
    expect(tangents[1]).toBeInstanceOf(Segment);
    
    // Обновленные координаты точек касания
    const [t1, t2] = tangents;
    expect(t1.pe.x).toBeCloseTo(-1.9641016151378, 10);
    expect(t1.pe.y).toBeCloseTo(4.5980762113533, 10);
    expect(t2.pe.x).toBeCloseTo(4.9641016151378, 10);
    expect(t2.pe.y).toBeCloseTo(-0.5980762113533, 10);

    // Геометрические проверки
    expect(t1.ps).toEqual(point); // Начало отрезка - исходная точка
    expect(t2.ps).toEqual(point);
    expect(circle.contains(t1.pe)).toBe(true); // Конец отрезка на окружности
    expect(circle.contains(t2.pe)).toBe(true);
    
    // Проверка длины касательных
    expect(t1.length).toBeCloseTo(8.660254037844387, 5);
    expect(t2.length).toBeCloseTo(8.660254037844387, 5);
  });

  test('should throw error for point inside circle', () => {
    const circle = new Circle(new Point(2, 2), 3);
    const point = new Point(3, 3);
    
    expect(() => {
      circle.tangentsFromPoint(point);
    }).toThrow('Point must be outside the circle');
  });

  test('should throw error for point on circle', () => {
    const circle = new Circle(new Point(0, 0), 5);
    const point = new Point(5, 0);
    
    expect(() => {
      circle.tangentsFromPoint(point);
    }).toThrow('Point must be outside the circle');
  });

  test('should throw error for non-point argument', () => {
    const circle = new Circle(new Point(0, 0), 5);
    
    expect(() => {
      circle.tangentsFromPoint({x: 10, y: 0});
    }).toThrow('First argument must be a Point');
  });

  test('should calculate correct tangents for diagonal position', () => {
    const circle = new Circle(new Point(0, 0), 5);
    const point = new Point(10, 10);
    
    const tangents = circle.tangentsFromPoint(point);
    
    // Проверка расстояний от центра до касательных
    tangents.forEach(t => {
      const distance = circle.center.distanceTo(t)[0];
      expect(distance).toBeCloseTo(5, 10);
    });
    
    // Проверка равенства длин касательных
    const [t1, t2] = tangents;
    expect(t1.length).toBeCloseTo(t2.length, 10);
  });

  test('should create tangents with specified segment length', () => {
    const circle = new Circle(new Point(0, 0), 5);
    const point = new Point(6, 8);
    const segmentLength = 3;
    
    const tangents = circle.tangentsFromPoint(point, {segmentLength});
    
    // Проверяем общую длину отрезков
    tangents.forEach(t => {
        expect(t.length).toBeCloseTo(segmentLength, 5);
    });

    // Проверяем координаты конечных точек с фиксированной длиной
    const [t1, t2] = tangents;
    expect(t1.pe.x).toBeCloseTo(3.2453612594936);
    expect(t1.pe.y).toBeCloseTo(6.8251941644673);
    expect(t2.pe.x).toBeCloseTo(5.6449620998367); 
    expect(t2.pe.y).toBeCloseTo(5.0199079129244);
});

test('should throw error for invalid segment length', () => {
    const circle = new Circle(new Point(0, 0), 5);
    const point = new Point(6, 8);
    
    // Отрицательная длина
    expect(() => {
        circle.tangentsFromPoint(point, {segmentLength: -5});
    }).toThrow('segmentLength must be a non-negative number');
    
    // Нечисловое значение
    expect(() => {
        circle.tangentsFromPoint(point, {segmentLength: 'invalid'});
    }).toThrow('segmentLength must be a non-negative number');
});

test('should work with zero segment length', () => {
    const circle = new Circle(new Point(0, 0), 5);
    const point = new Point(6, 8);
    
    const tangents = circle.tangentsFromPoint(point, {segmentLength: 0});
    
    // Проверяем что координаты совпадают с базовым вариантом
    const [t1, t2] = tangents;
    expect(t1.pe.x).toBeCloseTo(-1.9641016151378, 10);
    expect(t1.pe.y).toBeCloseTo(4.5980762113533, 10);
    expect(t2.pe.x).toBeCloseTo(4.9641016151378, 10);
    expect(t2.pe.y).toBeCloseTo(-0.5980762113533, 10);
});
});
