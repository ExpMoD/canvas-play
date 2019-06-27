let fps = 0
let lastRun;

let triangles = [];


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
    cfg.ctx.beginPath();

    triangle.nextFrame();

    let v1 = triangle.getVertix1()
    let v2 = triangle.getVertix2()
    let v3 = triangle.getVertix3()

    cfg.ctx.moveTo(v1.x, v1.y)
    cfg.ctx.lineTo(v2.x, v2.y)
    cfg.ctx.lineTo(v3.x, v3.y)
    cfg.ctx.lineTo(v1.x, v1.y)

    cfg.ctx.fillStyle = '#f00'
    cfg.ctx.fill()
}

let angTri1 = 0;
let angTri2 = 0;
let angTri3 = 0;
let angTri4 = 0;
let render = () => {
    fillBG()
    drawGameField()

    triangles.forEach(function (triangle) {
        drawTriangle(triangle)
    })
}


let drawFrame = () => {
    if (!lastRun) {
        lastRun = performance.now();
        requestAnimFrame(drawFrame);
        return;
    }

    let delta = (performance.now() - lastRun) / 1000;
    lastRun = performance.now();
    fps = 1 / delta;

    render();

    requestAnimFrame(drawFrame)
}

$(() => {
    triangles.push(new TriangleClass(new DotClass(cfg.canvas.width / 2 - 200, cfg.canvas.height / 2), 0, 1))
    /*triangles.push(new TriangleClass(new DotClass(cfg.canvas.width / 2 + 200, cfg.canvas.height / 2), 0, 0.5))
    triangles.push(new TriangleClass(new DotClass(cfg.canvas.width / 2, cfg.canvas.height / 2 - 200), 0, 0.3))
    triangles.push(new TriangleClass(new DotClass(cfg.canvas.width / 2, cfg.canvas.height / 2 + 200), 0, 2))*/

    requestAnimFrame(drawFrame)
})