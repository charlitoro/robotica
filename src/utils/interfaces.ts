interface Robot {
    distances: {
        k: number, l: number, m: number, n: number,
    },
    angles: {
        t0: number, t1: number, t2: number, t3: number, t4: number, t5: number
    }
}

interface DH {
    theta: number, d: number, a: number, alpha: number
}

export { Robot, DH }