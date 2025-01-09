
export function isValidTriangle(a, b, c) {
    return a > 0 && b > 0 && c > 0 && a + b > c && a + c > b && b + c > a;
}

export function calculateThirdSideUsingCosineLaw(a, b, angle) {
    return Math.sqrt(a * a + b * b - 2 * a * b * Math.cos(angle));
}
