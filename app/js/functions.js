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

let turnTriangle = (dots, angle, center) => {
    return dots.map((dot) => {
        return {
            x: (dot.x - center.x) * Math.cos(angle) - (dot.y - center.y) * Math.sin(angle) + center.x,
            y: (dot.x - center.x) * Math.sin(angle) + (dot.y - center.y) * Math.cos(angle) + center.y
        }
    })
    /*return [
        {
            x:  (dots[0].x - centerX) * cos(angle) - (dots[0].y - centerY) * sin(angle) + centerX,
            y:  (dots[0].x - centerX) * sin(angle) + (dots[0].y - centerY) * cos(angle) + centerY
        },
        {
            x: dots[1].x,
            y: dots[1].y
        },
        {
            x: dots[2].x,
            y: dots[2].y
        }
    ]*/
}