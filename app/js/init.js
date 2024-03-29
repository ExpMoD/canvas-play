let fps = 0
let lastRun

let cfg, area, polygonsPositions, polygons = [], balls = []

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

let drawPolygon = (polygon) => {
    polygon.nextFrame()

    if (polygon.visible) {
        cfg.ctx.beginPath()
        let vertices = polygon.getVertices()

        cfg.ctx.moveTo(vertices[0].x, vertices[0].y)
        for (let i = 1; i < vertices.length; i++)
            cfg.ctx.lineTo(vertices[i].x, vertices[i].y)
        cfg.ctx.lineTo(vertices[0].x, vertices[0].y)

        cfg.ctx.fillStyle = polygon.color
        cfg.ctx.fill()
    }
}

let drawPolygonsStack = () => {
    polygonsPositions.nextFrame()

    let curPolygonsPos = polygonsPositions.getCurrentDots()

    polygons.forEach((triangle, index) => {
        polygons[index].setCenterDot(curPolygonsPos[index])
    })

    polygons.forEach(function (polygon) {
        drawPolygon(polygon)
    })
}

let stop = false
let drawBall = (ball) => {
    ball.nextFrame()

    if (CollisionClass.checkCollisionBallAndArea(ball, area)) {
        ball.angle = CollisionClass.getDegreeCollisionAreaDot(ball, area)
    }

    cfg.ctx.beginPath()

    cfg.ctx.arc(ball.dot.x, ball.dot.y, ball.radius, 0, 2 * Math.PI, false)
    cfg.ctx.fillStyle = ball.bgColor
    cfg.ctx.fill()

    polygons.forEach((polygon) => {
        if (CollisionClass.checkPossiblePolygonCollision(ball, polygon)) {
            if (closestFace = CollisionClass.checkPolygonCollision(ball, polygon, cfg.ballSpeed)) {
                ball.angle = CollisionClass.getDegreePolygonCollision(ball, closestFace)
            }
        }
    })
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

    drawBallsStack()
    drawPolygonsStack()
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
    cfg = new configClass()
    cfg.canvasResize()
    $(window).on('resize', () => {cfg.canvasResize()});

    area = new AreaClass(
        new DotClass(cfg.canvas.width / 2, cfg.canvas.height / 2),
        cfg.getAreaSize(),
        cfg.areaBgColor,
        cfg.areaBorderColor,
        cfg.areaBorderSize
    )

    polygonsPositions = new PolygonPositionsClass(
        new DotClass(cfg.canvas.width / 2, cfg.canvas.height / 2),
        cfg.polygonCount, 0, 0.14, cfg.getPolygonCircleSize()
    )

    polygonsPositions.dots.forEach((dot) => {
        polygons.push(new PolygonClass(
            new DotClass(dot.x, dot.y),
            getRandomInt(0, 359),
            getRandomArbitary(0.1, 2),
            cfg.polygonColors[getRandomInt(0, cfg.polygonColors.length - 1)],
            !!(getRandomInt(0, 1)),
            cfg.getPolygonSize(), cfg.polygonNumberFaces))
    })

    for (let i = 0; i < cfg.ballCount; i++) {
        balls.push(new BallClass(
            new DotClass(cfg.canvas.width / 2, cfg.canvas.height / 2),
            cfg.getBallSize(),
            getRandomInt(0, 360),
            cfg.ballSpeed,
            cfg.ballBgColor
        ))
    }

    cfg.addResizeCallbackFn((config) => {
        area.setCenterDot(new DotClass(config.canvas.width / 2, config.canvas.height / 2))
            .setRadius(config.getAreaSize())

        polygonsPositions.setCenterDot(
            new DotClass(config.canvas.width / 2, config.canvas.height / 2),
            config.getPolygonCircleSize())

        polygons.forEach((triangle, index) => {
            polygons[index].size = config.getPolygonSize()
        })

        balls.forEach((ball, index) => {
            balls[index].radius = cfg.getBallSize()
        })
    })

    requestAnimFrame(drawFrame)
})