function e1Controlls() {
    const t0 = document.querySelector('#t0Input')
    const t0Text = document.querySelector('#t0Text')
    return { t0, t0Text }
}

function e2Controlls() {
    const t1 = document.querySelector('#t1Input')
    const t1Text = document.querySelector('#t1Text')
    return { t1, t1Text }
}

function e3Controlls() {
    const t2 = document.querySelector('#t2Input')
    const t2Text = document.querySelector('#t2Text')
    const t3 = document.querySelector('#t3Input')
    const t3Text = document.querySelector('#t3Text')
    return { t2, t2Text, t3, t3Text }
}

function e4Controlls() {
    const t4 = document.querySelector('#t4Input')
    const t4Text = document.querySelector('#t4Text')
    return { t4, t4Text }
}

function e5Controlls() {
    const t5 = document.querySelector('#t5Input')
    const t5Text = document.querySelector('#t5Text')
    return { t5, t5Text }
}

function getRandomInt(min, max) {
    min = ceil(min)
    max = floor(max)
    return floor(random() * (max - min + 1)) + min
}

function DH(t0, t1, t2, t3, t4, t5) {
    return fetch('https://robotica-api.herokuapp.com/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            query: `
                query{
                    robot(robot:{
                        distances: {
                            k: ${LENGTH.K}, l: ${LENGTH.L}, m: ${LENGTH.M}, n: ${LENGTH.N}
                        }
                        angles: {
                            t0: ${t0}, t1: ${t1}, t2: ${t2}, t3: ${t3}, t4: ${t4}, t5: ${t5}
                        }
                    }){ coordinate { x y z } }
                }
            `
        }),
    })
        .then(res => res.json())
        .then(({data}) => {
            const { robot: { coordinate: { x, y, z } } } = data
            return { x, y, z }
        })
}

function main() {
    function updateT0(angle) {
        t0.value = angle
        t0Text.innerHTML = `Rotar eslabon #1: ${angle} DEG`
        e1.rotation.y = degToRad(angle)
    }
    function updateT1(angle) {
        t1.value = angle
        t1Text.innerHTML = `Mover eslabon #2: ${angle} DEG`
        e12.rotation.z = degToRad(angle)
    }
    function updateT2(angle) {
        t2.value = angle
        t2Text.innerHTML = `Mover eslabon #3: ${angle} DEG`
        e22.rotation.z = degToRad(angle)
    }
    function updateT3(angle) {
        t3.value = angle
        t3Text.innerHTML = `Rotar eslabon #3: ${angle} DEG`
        e31.rotation.y = - degToRad(angle)
    }
    function updateT4(angle) {
        t4.value = angle
        t4Text.innerHTML = `Mover eslabon #4: ${angle} DEG`
        e32.rotation.z = degToRad(angle)
    }
    function updateT5(angle) {
        t5.value = angle
        t5Text.innerHTML = `Rotar eslabon #4: ${angle} DEG`
        e41.rotation.y = degToRad(angle)
    }
    // Get dom element to attach canvas
    const canvasDomElement = document.querySelector('.canvas')
    // Get dom elements for robot movement
    const { t0, t0Text } = e1Controlls()
    const { t1, t1Text } = e2Controlls()
    const { t2, t2Text, t3, t3Text } = e3Controlls()
    const { t4, t4Text } = e4Controlls()
    const { t5, t5Text } = e5Controlls()
    const random = document.querySelector('#randomInput')
    const sphereText = document.querySelector('#sphereText')
    // Get dom element size
    const { clientHeight, clientWidth } = canvasDomElement
    // THREEJS
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, clientWidth / clientHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    const light = new THREE.PointLight(0xFFFFFF, 1, 500)
    const controls = new THREE.OrbitControls(camera, renderer.domElement)
    // Camera inital config
    camera.position.z = 8
    camera.position.y = 10
    camera.position.x = 8
    camera.lookAt(0, 0, 0)
    // Renderer initial config
    renderer.setClearColor('#e5e5e5')
    renderer.setSize(clientWidth, clientHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    // Light initial config
    light.position.set(10, -10, 25)
    // Scene initial config
    scene.add(light)
    scene.add(new THREE.AxesHelper(0.5))
    scene.rotation.set(PI / 2, PI, PI)
    // Resize canvas
    window.addEventListener('resize', () => {
        const { clientHeight, clientWidth } = canvasDomElement
        renderer.setSize(clientWidth, clientHeight)
        camera.aspect = clientWidth / clientHeight
        camera.updateProjectionMatrix()
    })
    // Rotate E1 AROUND ITSELF
    t0.addEventListener('input', (e) => {
        updateT0(e.target.value)
        DH(t0.value, t1.value, t2.value, t3.value, t4.value, t5.value).then(({ x, y, z }) => {
            sphere.position.set(x, y, z)
            sphereText.innerHTML = `X: ${sphere.position.x} Y: ${sphere.position.y} Z: ${sphere.position.z}`
        })
    })
    // Rotate E2 UP-DOWN
    t1.addEventListener('input', (e) => {
        updateT1(e.target.value)
        DH(t0.value, t1.value, t2.value, t3.value, t4.value, t5.value).then(({ x, y, z }) => {
            sphere.position.set(x, y, z)
            sphereText.innerHTML = `X: ${sphere.position.x} Y: ${sphere.position.y} Z: ${sphere.position.z}`
        })
    })
    // Rotate E3 UP-DOWN
    t2.addEventListener('input', (e) => {
        updateT2(e.target.value)
        DH(t0.value, t1.value, t2.value, t3.value, t4.value, t5.value).then(({ x, y, z }) => {
            sphere.position.set(x, y, z)
            sphereText.innerHTML = `X: ${sphere.position.x} Y: ${sphere.position.y} Z: ${sphere.position.z}`
        })
    })
    // Rotate E3 AROUND ITSELF
    t3.addEventListener('input', (e) => {
        updateT3(e.target.value)
        DH(t0.value, t1.value, t2.value, t3.value, t4.value, t5.value).then(({ x, y, z }) => {
            sphere.position.set(x, y, z)
            sphereText.innerHTML = `X: ${sphere.position.x} Y: ${sphere.position.y} Z: ${sphere.position.z}`
        })
    })
    // Rotate E4 UP-DOWN
    t4.addEventListener('input', (e) => {
        updateT4(e.target.value)
        DH(t0.value, t1.value, t2.value, t3.value, t4.value, t5.value).then(({ x, y, z }) => {
            sphere.position.set(x, y, z)
            sphereText.innerHTML = `X: ${sphere.position.x} Y: ${sphere.position.y} Z: ${sphere.position.z}`
        })
    })
    // Rotate E4 AROUND ITSELF
    t5.addEventListener('input', (e) => {
        updateT5(e.target.value)
        DH(t0.value, t1.value, t2.value, t3.value, t4.value, t5.value).then(({ x, y, z }) => {
            sphere.position.set(x, y, z)
            sphereText.innerHTML = `X: ${sphere.position.x} Y: ${sphere.position.y} Z: ${sphere.position.z}`
        })
    })
    // Random
    random.addEventListener('click', (e) => {
        updateT0(getRandomInt(0, 360))
        updateT1(getRandomInt(-40, 240))
        updateT2(getRandomInt(-90, 90))
        updateT3(getRandomInt(0, 360))
        updateT4(getRandomInt(-90, 90))
        updateT5(getRandomInt(0, 360))
        DH(t0.value, t1.value, t2.value, t3.value, t4.value, t5.value).then(({ x, y, z }) => {
            sphere.position.set(x, y, z)
            sphereText.innerHTML = `X: ${sphere.position.x} Y: ${sphere.position.y} Z: ${sphere.position.z}`
        })
    })
    canvasDomElement.append(renderer.domElement)
    // Add elements
    const e1 = buildE1()
    const e11 = buildE11()
    const e12 = buildE12()
    const e21 = buildE21()
    const e22 = buildE22()
    const e31 = buildE31()
    const e32 = buildE32()
    const e41 = buildE41()
    // ---
    const sphere = buildSphere()
    sphereText.innerHTML = `X: ${sphere.position.x} Y: ${sphere.position.y} Z: ${sphere.position.z}`
    // ---
    e1.add(e11)
    e11.add(e12)
    e12.add(e21)
    e21.add(e22)
    e22.add(e31)
    e31.add(e32)
    e32.add(e41)
    scene.add(e1)
    scene.add(sphere)
    // Render
    function render() {
        requestAnimationFrame(render)
        renderer.render(scene, camera)
    }
    render()
}
