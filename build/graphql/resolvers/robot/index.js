"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.robot = void 0;
const utils_1 = require("../../../utils");
const robot = (_root, args, _context) => {
    // Este robot consta de tres sistemas coordinados (S0, S1, S2, S3), donde el primero es afín
    // a la base del robot y el último es afín al efector del robot
    const { distances: { k, l, m, n, }, angles: { t0, t1, t2, t3, t4, t5 } } = args.robot; // Obtener parametros del robot
    const { PI, atan, acos, pow } = Math;
    const zeroAone = utils_1.MTH(t0, k, 0, 90); // Calcular matrix 4x4 0A1
    const oneAtwo = utils_1.MTH(t1, 0, l, 0); // Calcular matriz 4x4 1A2
    const twoAthree = utils_1.MTH(t2 + 90, 0, 0, 90); // Calcular matriz 4x4 2A3
    const threeAfour = utils_1.MTH(t3 + 180, m, 0, 90); // Calcular matriz 4x4 3A4
    const fourAFive = utils_1.MTH(t4 + 180, 0, 0, 90); // Calcular matrix 4x4 4A5
    const fiveASix = utils_1.MTH(t5, n, 0, 0); // Calcular matrix 4x4 5A6
    // MTH 4x4 final sale de multiplicar las MTH individuales de modo que se obtiene 0A4
    const t = utils_1.T(zeroAone, oneAtwo, twoAthree, threeAfour, fourAFive, fiveASix);
    // Retornar px, py, pz de la MTH 4x4 final, que son las coordenadas del efector final del robot
    // const pmx = t.get(0,3) - n
    const x = t.get(0, 3);
    const y = t.get(1, 3);
    const z = t.get(2, 3);
    return {
        coordinate: {
            x: x.toFixed(4),
            y: y.toFixed(4),
            z: z.toFixed(4),
        },
        mth: [
            [t.get(0, 0).toFixed(4), t.get(0, 1).toFixed(4), t.get(0, 2).toFixed(4), t.get(0, 3).toFixed(4)],
            [t.get(1, 0).toFixed(4), t.get(1, 1).toFixed(4), t.get(1, 2).toFixed(4), t.get(1, 3).toFixed(4)],
            [t.get(2, 0).toFixed(4), t.get(2, 1).toFixed(4), t.get(2, 2).toFixed(4), t.get(2, 3).toFixed(4)],
            [0, 0, 0, 1]
        ],
        angles: {
            t0: utils_1.Theta0(x, y).toFixed(4),
            t1: utils_1.Theta1(x, y, z, k, l, m).toFixed(4),
            t2: 0,
            t3: 0,
            t4: 0,
            t5: 0
        }
    };
};
exports.robot = robot;
