"use strict";
// Denavit-Hartenberg calcs
Object.defineProperty(exports, "__esModule", { value: true });
exports.Theta1 = exports.Theta0 = exports.T = exports.MTH = void 0;
const ml_matrix_1 = require("ml-matrix");
const { cos, sin, atan, acos, pow, sqrt, PI } = Math;
const { log } = console;
const RZ = (theta) => {
    const x = theta * Math.PI / 180; // Conversion a radianes
    return new ml_matrix_1.Matrix([
        [cos(x), -sin(x), 0, 0],
        [sin(x), cos(x), 0, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 1]
    ]);
};
const TZ = (d) => {
    return ml_matrix_1.Matrix.identity(4, 4).set(2, 3, d);
};
const TX = (a) => {
    return ml_matrix_1.Matrix.identity(4, 4).set(0, 3, a);
};
const RX = (alpha) => {
    const x = alpha * Math.PI / 180; // Conversion a radianes
    return new ml_matrix_1.Matrix([
        [1, 0, 0, 0],
        [0, cos(x), -sin(x), 0],
        [0, sin(x), cos(x), 0],
        [0, 0, 0, 1]
    ]);
};
const MTH = (theta, d, a, alpha) => {
    // Para calcular la MTH del sistema i respecto al sistema i-1 se debe operar
    // Rz(theta) X Tz(0,0,d) X Tx(a,0,0) X Rx(alpha)
    return RZ(theta).mmul(TZ(d)).mmul(TX(a)).mmul(RX(alpha));
};
exports.MTH = MTH;
const T = (...mth) => {
    // Para calcular la MTH final, es decir del sistema base al sistema del efector, se deben operar
    // todas las MTH de los sistemas i-esimos
    let t = ml_matrix_1.Matrix.identity(4, 4);
    mth.forEach(m => { t = t.mmul(m); });
    return t;
};
exports.T = T;
const Theta0 = (x, y) => {
    let angle = atan(y / x) * 180 / PI;
    // angle = angle <= 90 ? angle : angle + 180
    return angle;
};
exports.Theta0 = Theta0;
const Theta1 = (x, y, z, k, l, m) => {
    const phi = atan((z - k) / sqrt(pow(x, 2) + pow(y, 2)));
    const alpha = acos((-pow(x, 2) - pow(y, 2) - pow(l, 2) + pow(m, 2)) / -(2 * l * sqrt(pow(x, 2) + pow(y, 2) + pow(z - k, 2))));
    return (phi - alpha) * 180 / PI;
};
exports.Theta1 = Theta1;
