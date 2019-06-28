window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback, element) {
            window.setTimeout(function () {

                callback(+new Date)
            }, 1000 / 60)
        }
})()

let getTrianglesPositions = (centerDot, count) => {
    let dots = []

    for (let i = 0; i <= count - 1; i++) {
        dots.push(new DotClass(
            centerDot.x + (cfg.circleSize() - 50) * Math.cos(2 * i * Math.PI / count),
            centerDot.y + (cfg.circleSize() - 50) * Math.sin(2 * i * Math.PI / count)
        ))
    }

    return dots
}

let getNewTrianglesPositionsAngle = (dots, angle) => {

}


function getRandomArbitary(min, max)
{
    return Math.random() * (max - min) + min;
}

function getRandomInt(min, max)
{
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
