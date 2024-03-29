class PolygonClass {
    constructor (centerDot, angle, speed, color, reverse, size, numberFaces) {
        this.angle = angle
        this.angleRad = this.angle * (Math.PI / 180)
        this.speed = speed
        this.color = color
        this.reverse = reverse

        this.stopped = false
        this.visible = true

        this.size = size
        this.numberFaces = numberFaces

        this.vertices = []

        this.setCenterDot(centerDot, this.size)
    }

    nextFrame () {
        if (!this.stopped) {
            if (this.reverse) {
                this.angle = this.angle - this.speed
                if (this.angle < 0) this.angle += 360
            } else {
                this.angle = this.angle + this.speed
                if (this.angle > 360) this.angle -= 360
            }

            this.angleRad = this.angle * (Math.PI / 180)
        }
    }

    setCenterDot (dot, size = false) {
        this.centerDot = dot
        this.vertices = []

        for (let i = 0; i <= this.numberFaces - 1; i++) {
            this.vertices.push(new DotClass(
                this.centerDot.x + (size ? size : this.size) * Math.cos(2 * i * Math.PI / this.numberFaces),
                this.centerDot.y + (size ? size : this.size) * Math.sin(2 * i * Math.PI / this.numberFaces)
            ))
        }
    }

    getVertices () {
        let centerDot = this.centerDot,
            angleRad = this.angleRad

        return this.vertices.map(function (dot) {
            return new DotClass(
                (dot.x - centerDot.x) * Math.cos(angleRad) - (dot.y - centerDot.y) * Math.sin(angleRad) + centerDot.x,
                (dot.x - centerDot.x) * Math.sin(angleRad) + (dot.y - centerDot.y) * Math.cos(angleRad) + centerDot.y
            )
        })
    }
}