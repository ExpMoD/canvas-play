class BallClass {
    constructor (dot, radius, angle, speed, bgColor) {
        this.dot = dot
        this.radius = radius
        this.angle = angle
        this.speed = speed

        this.bgColor = bgColor

        this.stopped = false
    }

    nextFrame () {
        if (!this.stopped) {
            this.dot.x = this.dot.x + this.speed * Math.cos(this.angle * Math.PI / 180);
            this.dot.y = this.dot.y + this.speed * Math.sin(this.angle * Math.PI / 180);
        }
    }
}