const LENGTH = {
    K: 5, L: 3, M: 2.5, N: 1
}
const { PI, floor, random, ceil } = Math
const {
    CylinderGeometry, MeshLambertMaterial,
    MeshBasicMaterial, SphereGeometry,
    AxesHelper, BoxGeometry,
    Mesh, Line,
    MathUtils: { degToRad }
} = THREE

function buildSphere() {
    const radious = 0.1
    const segments = 16
    const geometry = new SphereGeometry(radious, segments, segments)
    const material = new MeshBasicMaterial({ color: 0xffff00 })
    const mesh = new Mesh(geometry, material)
    // const axes = new AxesHelper(2)
    // mesh.add(axes)
    mesh.position.set(LENGTH.L + LENGTH.M + LENGTH.N, 0, LENGTH.K)
    return mesh
}

function buildE1() {
    const radiousTop = 1
    const radiousBottom = 2
    const height = 1
    const radialSegments = 16
    const geometry = new CylinderGeometry(radiousTop, radiousBottom, height, radialSegments)
    const material = new MeshLambertMaterial({ color: 0xaaff22 })
    const mesh = new Mesh(geometry, material)
    // const axes = new AxesHelper(2)
    // mesh.add(axes)
    mesh.rotation.set(PI / 2, 0, 0)
    return mesh
}

function buildE11() {
    const radious = 0.6
    const height = LENGTH.K
    const radialSegments = 16
    const geometry = new CylinderGeometry(radious, radious, height, radialSegments)
    const material = new MeshLambertMaterial({ color: 0x780694 })
    const mesh = new Mesh(geometry, material)
    // const axes = new AxesHelper(2)
    // mesh.add(axes)
    mesh.position.set(0, height / 2, 0)
    return mesh
}

function buildE12() {
    const radious = 0.6
    const radialSegments = 16
    const geometry = new SphereGeometry(radious, radialSegments, radialSegments)
    const material = new MeshLambertMaterial({ color: 0xaaff22 })
    const mesh = new Mesh(geometry, material)
    // const axes = new AxesHelper(2)
    // mesh.add(axes)
    mesh.position.set(0, (LENGTH.K) / 2, 0)
    return mesh
}

function buildE21() {
    const radious = 0.6
    const height = LENGTH.L
    const radialSegments = 16
    const geometry = new CylinderGeometry(radious, radious, height, radialSegments)
    const material = new MeshLambertMaterial({ color: 0x780694 })
    const mesh = new Mesh(geometry, material)
    // const axes = new AxesHelper(2)
    // mesh.add(axes)
    mesh.rotation.set(0, 0, PI / 2)
    mesh.position.x = LENGTH.L / 2
    return mesh
}

function buildE22() {
    const radious = 0.6
    const radialSegments = 16
    const geometry = new SphereGeometry(radious, radialSegments, radialSegments)
    const material = new MeshLambertMaterial({ color: 0xaaff22 })
    const mesh = new Mesh(geometry, material)
    // const axes = new AxesHelper(2)
    // mesh.add(axes)
    mesh.position.y = -LENGTH.L / 2
    return mesh
}

function buildE31() {
    const radious = 0.6
    const height = LENGTH.M
    const radialSegments = 16
    const geometry = new CylinderGeometry(radious, radious, height, radialSegments)
    const material = new MeshLambertMaterial({ color: 0x780694 })
    const mesh = new Mesh(geometry, material)
    // const axes = new AxesHelper(2)
    // mesh.add(axes)
    mesh.position.y = - LENGTH.M / 2
    return mesh
}

function buildE32() {
    const radious = 0.6
    const radialSegments = 16
    const geometry = new SphereGeometry(radious, radialSegments, radialSegments)
    const material = new MeshLambertMaterial({ color: 0xaaff22 })
    const mesh = new Mesh(geometry, material)
    // const axes = new AxesHelper(2)
    // mesh.add(axes)
    mesh.position.y = -LENGTH.M / 2
    return mesh
}

function buildE41() {
    const radious = 0.6
    const height = LENGTH.N
    const radialSegments = 16
    const geometry = new CylinderGeometry(radious, radious - 0.4, height, radialSegments)
    const material = new MeshLambertMaterial({ color: 0x780694 })
    const mesh = new Mesh(geometry, material)
    // const axes = new AxesHelper(2)
    // mesh.add(axes)
    mesh.position.y = - LENGTH.N / 2
    return mesh
}