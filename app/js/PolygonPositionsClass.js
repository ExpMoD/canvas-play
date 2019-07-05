class PolygonPositionsClass {
    constructor (centerDot, count, angle, speed, circleSize) {
        this.circleSize = circleSize

        this.count = count
        this.speed = speed
        this.angle = angle
        this.angleRad = this.angle * (Math.PI / 180)

        this.dots = []

        this.setCenterDot(centerDot)
    }

    nextFrame () {
        this.angle = this.angle + this.speed
        this.angleRad = this.angle * (Math.PI / 180)
    }

    setCenterDot (centerDot, circleSize = false) {
        this.centerDot = centerDot
        this.circleSize = circleSize ? circleSize : this.circleSize

        this.dots = []

        for (let i = 0; i <= this.count - 1; i++) {
            this.dots.push(new DotClass(
                this.centerDot.x + this.circleSize * Math.cos(2 * i * Math.PI / this.count),
                this.centerDot.y + this.circleSize * Math.sin(2 * i * Math.PI / this.count)
            ))
        }
    }

    getCurrentDots () {
        let centerDot = this.centerDot,
            angleRad = this.angleRad

        return this.dots.map(function (dot) {
            return new DotClass(
                (dot.x - centerDot.x) * Math.cos(angleRad) - (dot.y - centerDot.y) * Math.sin(angleRad) + centerDot.x,
                (dot.x - centerDot.x) * Math.sin(angleRad) + (dot.y - centerDot.y) * Math.cos(angleRad) + centerDot.y
            )
        })
    }
}