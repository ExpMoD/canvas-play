let fps = 0
let lastRun

let trianglesPositions
let triangles = []

let balls = []

let fillBG = () => {
    cfg.ctx.beginPath()
    cfg.ctx.rect(0, 0, cfg.canvas.width, cfg.canvas.height)
    cfg.ctx.fillStyle = cfg.bgColor
    cfg.ctx.fill()
}

let drawGameField = () => {
    cfg.ctx.beginPath()
    cfg.ctx.arc(cfg.canvas.width / 2, cfg.canvas.height / 2, cfg.circleSize(), 0, 2 * Math.PI, false)
    cfg.ctx.fillStyle = cfg.circleBgColor
    cfg.ctx.fill()
    cfg.ctx.lineWidth = 1
    cfg.ctx.strokeStyle = cfg.circleBorderColor
    cfg.ctx.stroke()
}

let drawTriangle = (triangle) => {
    triangle.nextFrame()

    if (triangle.visible) {
        cfg.ctx.beginPath()
        let vertices = triangle.getVertices()

        cfg.ctx.moveTo(vertices[0].x, vertices[0].y)
        cfg.ctx.lineTo(vertices[1].x, vertices[1].y)
        cfg.ctx.lineTo(vertices[2].x, vertices[2].y)
        cfg.ctx.lineTo(vertices[0].x, vertices[0].y)

        cfg.ctx.fillStyle = triangle.color
        cfg.ctx.fill()
    }
}

let drawTrianglesStack = () => {
    trianglesPositions.nextFrame()

    let curTrianglesPos = trianglesPositions.getCurrentDots()

    triangles.forEach((triangle, index) => {
        triangles[index].setCenterDot(curTrianglesPos[index])
    })

    triangles.forEach(function (triangle) {
        drawTriangle(triangle)
    })
}

let stop = false
let drawBall = (ball) => {
    if (!stop) {
        ball.nextFrame()
    }

    cfg.ctx.beginPath()

    let curPosBall = ball.getPosition()

    CollisionClass.collisionBallAndCircle(ball, new DotClass(cfg.canvas.width / 2, cfg.canvas.height / 2), cfg.circleSize())

    /*if (Math.pow(curPosBall.x - cfg.canvas.width / 2, 2) + Math.pow(curPosBall.y - cfg.canvas.height / 2, 2) < Math.pow(ball.radius - cirSize + 1, 2)) {
        console.log(false)
    } else {
        stop = true
        console.log(true)
    }*/

    cfg.ctx.arc(curPosBall.x, curPosBall.y, ball.radius, 0, 2 * Math.PI, false)
    cfg.ctx.fillStyle = 'black'
    cfg.ctx.fill()
}

let drawBallsStack = () => {
    balls.forEach((ball, index) => {
        drawBall(ball)
    })
}

let render = () => {
    fillBG()
    drawGameField()

    drawTrianglesStack()

    drawBallsStack()
}

let drawFrame = () => {
    if (!lastRun) {
        lastRun = performance.now()
        requestAnimFrame(drawFrame)
        return
    }

    let delta = (performance.now() - lastRun) / 1000
    lastRun = performance.now()
    fps = 1 / delta

    render()

    requestAnimFrame(drawFrame)
}

$(() => {
    trianglesPositions = new TrianglePositionsClass(
        new DotClass(cfg.canvas.width / 2, cfg.canvas.height / 2),
        cfg.triangleCount, 0, 0.14, cfg.getTriangleCircleSize()
    )

    trianglesPositions.dots.forEach((dot) => {
        triangles.push(new TriangleClass(
            new DotClass(dot.x, dot.y),
            getRandomInt(0, 359),
            getRandomArbitary(0.1, 2),
            cfg.triangleColors[getRandomInt(0, cfg.triangleColors.length - 1)],
            !!(getRandomInt(0, 1)),
            cfg.getTriangleSize()))
    })

    balls.push(new BallClass(
        new DotClass(cfg.canvas.width / 2, cfg.canvas.height / 2),
        cfg.getBallSize(),
        getRandomInt(0, 360),
        cfg.ballSpeed
    ))

    cfg.addResizeCallbackFn((config) => {
        trianglesPositions.setCenterDot(
            new DotClass(config.canvas.width / 2, config.canvas.height / 2),
            config.getTriangleCircleSize())

        triangles.forEach((triangle, index) => {
            triangles[index].size = config.getTriangleSize()
        })
    })

    requestAnimFrame(drawFrame)
})