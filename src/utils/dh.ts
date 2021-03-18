// Denavit-Hartenberg calcs

import { Matrix } from 'ml-matrix'

const { cos, sin, atan, acos, pow, sqrt, PI } = Math
const { log } = console

const RZ = (theta: number): Matrix => {
    const x: number = theta * Math.PI / 180 // Conversion a radianes
    return new Matrix([
        [cos(x), -sin(x), 0, 0],
        [sin(x), cos(x), 0, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 1]
    ])
}

const TZ = (d: number): Matrix => {
    return Matrix.identity(4, 4).set(2, 3, d)
}

const TX = (a: number): Matrix => {
    return Matrix.identity(4, 4).set(0, 3, a)
}

const RX = (alpha: number): Matrix => {
    const x: number = alpha * Math.PI / 180 // Conversion a radianes
    return new Matrix([
        [1, 0, 0, 0],
        [0, cos(x), -sin(x), 0],
        [0, sin(x), cos(x), 0],
        [0, 0, 0, 1]
    ])
}

const MTH = (theta: number, d: number, a: number, alpha: number): Matrix => {
    // Para calcular la MTH del sistema i respecto al sistema i-1 se debe operar
    // Rz(theta) X Tz(0,0,d) X Tx(a,0,0) X Rx(alpha)
    return RZ(theta).mmul(TZ(d)).mmul(TX(a)).mmul(RX(alpha))
}

const T = (...mth: Array<Matrix>): Matrix => {
    // Para calcular la MTH final, es decir del sistema base al sistema del efector, se deben operar
    // todas las MTH de los sistemas i-esimos
    let t: Matrix = Matrix.identity(4, 4)
    mth.forEach(m => { t = t.mmul(m) })
    return t
}

const Theta0 = (x: number, y: number): number => {
    let angle = atan(y / x) * 180 / PI
    // angle = angle <= 90 ? angle : angle + 180
    return angle
}

const Theta1 = (x: number, y: number, z: number, k: number, l: number, m: number): number => {
    const phi: number = atan((z - k) / sqrt(pow(x, 2) + pow(y, 2)))
    const alpha: number = acos((- pow(x, 2) - pow(y, 2) - pow(l, 2) + pow(m, 2)) / -(2 * l * sqrt(pow(x, 2) + pow(y, 2) + pow(z - k, 2))))
    return (phi - alpha) * 180 / PI
}

export { MTH, T, Theta0, Theta1 }