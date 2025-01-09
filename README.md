# flatten-shape-geometry

`flatten-shape-geometry` — это библиотека для работы с геометрическими фигурами, предоставляющая инструменты для вычисления параметров фигур и их визуализации на холсте. Основное внимание уделяется треугольникам, но библиотека может быть расширена для работы с другими формами. Она интегрируется с `@flatten-js/core` для работы с геометрическими примитивами и использует `mathjs` для сложных математических вычислений. Эта библиотека подходит  выполнения точных геометрических расчетов и визуализации результатов в веб-приложениях при помощи `canvas`.


### Использование класса `Triangle`

Класс `Triangle` позволяет создавать и работать с треугольниками, используя различные параметры. Вот как можно использовать этот класс:

1. **Создание треугольника с использованием точек:**

   Вы можете создать треугольник, передав массив из трех точек. Каждая точка должна иметь координаты `x` и `y`.

   ```javascript
   const points = [
       { x: 0, y: 0 },
       { x: 3, y: 0 },
       { x: 0, y: 4 }
   ];

   const supplementary = {
       calculateMedians: true,
       calculateHeights: true,
       calculateBisectors: true,
       calculateMidlines: true
   };

   const triangle = new Triangle({ points, supplementary });
   ```

2. **Создание треугольника с использованием длин сторон:**

   Вы также можете создать треугольник, указав длины его сторон.

   ```javascript
   const lengths = {
       lengthAB: 3,
       lengthBC: 4,
       lengthCA: 5
   };

   const triangleFromLengths = new Triangle({ lengths, supplementary });
   ```

3. **Создание треугольника с использованием двух сторон и угла:**

   Если у вас есть две стороны и угол между ними, вы можете использовать их для создания треугольника.

   ```javascript
   const angles = {
       angle: 90,
       angleInDegree: true
   };

   const triangleFromTwoSidesAndAngle = new Triangle({ lengths: { lengthAB: 3, lengthBC: 4 }, angles, supplementary });
   ```

### Доступные методы и свойства

После создания экземпляра треугольника вы можете использовать различные методы и свойства для получения информации о треугольнике:

- `vertices`: Вершины треугольника.
- `perimeter`: Периметр треугольника.
- `area()`: Площадь треугольника.
- `medianLengths`: Длины медиан.
- `heightLengths`: Длины высот.
- `bisectorLengths`: Длины биссектрис.
- `midlineLengths`: Длины средних линий.
- `angleAInDegrees`, `angleBInDegrees`, `angleCInDegrees`: Углы в градусах.
- `angleAInRadians`, `angleBInRadians`, `angleCInRadians`: Углы в радианах.
- `sinA`, `sinB`, `sinC`: Синусы углов.
- `cosA`, `cosB`, `cosC`: Косинусы углов.
- `tgA`, `tgB`, `tgC`: Тангенсы углов.
- `ctgA`, `ctgB`, `ctgC`: Котангенсы углов.
- `radiusOfCircumscribedCircle`: Радиус описанной окружности.
- `radiusOfInscribedCircle`: Радиус вписанной окружности.

## Лицензия

Этот проект лицензирован под [GNU Lesser General Public License v3.0](LICENSE).