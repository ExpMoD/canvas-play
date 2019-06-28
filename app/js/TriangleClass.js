class TriangleClass {
    constructor (centerDot, angle, speed) {
        this.angle = angle
        this.angleRad = this.angle * (Math.PI / 180)
        this.speed = speed

        this.triangleSize = cfg.triangleSize()

        this.vertices = []

        this.setCenterDot(centerDot)
    }

    nextFrame () {
        this.angle = this.angle + this.speed
        this.angleRad = this.angle * (Math.PI / 180)
    }

    setCenterDot (dot) {
        this.centerDot = dot

        for (let i = 0; i <= 3 - 1; i++) {
            this.vertices.push(new DotClass(
                this.centerDot.x + (this.triangleSize / 1.5) * Math.cos(2 * i * Math.PI / 3),
                this.centerDot.y + (this.triangleSize / 1.5) * Math.sin(2 * i * Math.PI / 3)
            ))
        }
    }

    getVertices () {
        let centerDot = this.centerDot,
            angleRad = this.angleRad

        return this.vertices.map(function (dot) {
            let vx = dot.x
            let vy = dot.y

            return new DotClass(
                (vx - centerDot.x) * Math.cos(angleRad) - (vy - centerDot.y) * Math.sin(angleRad) + centerDot.x,
                (vx - centerDot.x) * Math.sin(angleRad) + (vy - centerDot.y) * Math.cos(angleRad) + centerDot.y
            )
        })
    }
}