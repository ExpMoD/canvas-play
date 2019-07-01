let fps = 0
let lastRun

let area, trianglesPositions, triangles = [], balls = []

let fillBG = () => {
    cfg.ctx.beginPath()
    cfg.ctx.rect(0, 0, cfg.canvas.width, cfg.canvas.height)
    cfg.ctx.fillStyle = cfg.bgColor
    cfg.ctx.fill()
}

let drawArea = () => {
    cfg.ctx.beginPath()
    cfg.ctx.arc(area.centerDot.x, area.centerDot.y, area.radius, 0, 2 * Math.PI, false)
    cfg.ctx.fillStyle = area.backgroundColor
    cfg.ctx.fill()
    cfg.ctx.lineWidth = area.borderSize
    cfg.ctx.strokeStyle = area.borderColor
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

    if (CollisionClass.collisionBallAndArea(ball, area)) {
        ball.angle = CollisionClass.getDegreeCollisionAreaDot(ball, area)
    }

    cfg.ctx.beginPath()

    cfg.ctx.arc(ball.dot.x, ball.dot.y, ball.radius, 0, 2 * Math.PI, false)
    cfg.ctx.fillStyle = ball.bgColor
    cfg.ctx.fill()
}

let drawBallsStack = () => {
    balls.forEach((ball, index) => {
        drawBall(ball)
    })
}

let drawTestDot = (dot) => {
    cfg.ctx.beginPath()
    cfg.ctx.arc(dot.x, dot.y, 3, 0, 2 * Math.PI, false)
    cfg.ctx.fillStyle = '#ff1000'
    cfg.ctx.fill()
}


let drawTestLine = (dots) => {
    cfg.ctx.beginPath()
    cfg.ctx.moveTo(dots[0].x, dots[0].y)
    for (let i = 1; i < dots.length; i++)
        cfg.ctx.lineTo(dots[i].x, dots[i].y)

    cfg.ctx.strokeStyle = '#ff1000'
    cfg.ctx.stroke()
}

let render = () => {
    fillBG()
    drawArea()

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
    area = new AreaClass(
        new DotClass(cfg.canvas.width / 2, cfg.canvas.height / 2),
        cfg.circleSize(),
        cfg.areaBgColor,
        cfg.areaBorderColor,
        cfg.areaBorderSize
    )

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
        new DotClass(cfg.canvas.width / 2 - 200, cfg.canvas.height / 2 - 50),
        cfg.getBallSize(),
        getRandomInt(0, 360),
        cfg.ballSpeed,
        cfg.ballBgColor
    ))

    cfg.addResizeCallbackFn((config) => {
        area.setCenterDot(new DotClass(config.canvas.width / 2, config.canvas.height / 2))
            .setRadius(config.circleSize())

        trianglesPositions.setCenterDot(
            new DotClass(config.canvas.width / 2, config.canvas.height / 2),
            config.getTriangleCircleSize())

        triangles.forEach((triangle, index) => {
            triangles[index].size = config.getTriangleSize()
        })

        balls.forEach((ball, index) => {
            balls[index].radius = cfg.getBallSize()
        })
    })

    requestAnimFrame(drawFrame)
})