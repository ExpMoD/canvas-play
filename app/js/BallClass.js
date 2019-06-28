class BallClass {
    constructor (dot, radius, angle, speed) {
        this.dot = dot
        this.radius = radius
        this.angle = angle
        this.speed = speed
    }

    nextFrame () {
        this.dot.x = this.dot.x + this.speed * Math.cos(this.angle * Math.PI / 180);
        this.dot.y = this.dot.y + this.speed * Math.sin(this.angle * Math.PI / 180);
    }

    getPosition () {
        return this.dot
    }
}