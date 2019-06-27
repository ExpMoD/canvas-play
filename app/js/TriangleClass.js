class TriangleClass {
    constructor(centerDot, angle, speed) {
        this.angle = angle
        this.angleRad = this.angle * (Math.PI / 180)
        this.speed = 1

        this.triangleSize = cfg.triangleSize()
        this.trianglePart = this.triangleSize / 5

        this.vertix1 = new DotClass(0, 0)
        this.vertix2 = new DotClass(0, 0)
        this.vertix3 = new DotClass(0, 0)


        this.setCenterDot(centerDot)
    }

    nextFrame() {
        //this.angle = this.angle + this.speed
        //this.angleRad = 45 * (Math.PI / 180)
        this.angleRad = 1
    }

    setCenterDot(dot) {
        this.centerDot = dot

        this.vertix1.x = this.centerDot.x
        this.vertix1.y = this.centerDot.y - this.trianglePart * 3
        this.vertix2.x = this.centerDot.x - this.trianglePart * 3
        this.vertix2.y = this.centerDot.y + this.trianglePart * 2
        this.vertix3.x = this.centerDot.x + this.trianglePart * 3
        this.vertix3.y = this.centerDot.y + this.trianglePart * 2
    }

    getVertix1() {
        let vx = this.vertix1.x;
        let vy = this.vertix1.y;

        this.vertix1.x = (vx - this.centerDot.x) * Math.cos(this.angleRad) - (vy - this.centerDot.y) * Math.sin(this.angleRad) + this.centerDot.x
        this.vertix1.y = (vx - this.centerDot.x) * Math.sin(this.angleRad) + (vy - this.centerDot.y) * Math.cos(this.angleRad) + this.centerDot.y

        return this.vertix1
    }

    getVertix2() {
        let vx = this.vertix2.x;
        let vy = this.vertix2.y;

        this.vertix2.x = (vx - this.centerDot.x) * Math.cos(this.angleRad) - (vy - this.centerDot.y) * Math.sin(this.angleRad) + this.centerDot.x
        this.vertix2.y = (vx - this.centerDot.x) * Math.sin(this.angleRad) + (vy - this.centerDot.y) * Math.cos(this.angleRad) + this.centerDot.y

        return this.vertix2
    }

    getVertix3() {
        let vx = this.vertix3.x;
        let vy = this.vertix3.y;

        this.vertix3.x = (vx - this.centerDot.x) * Math.cos(this.angleRad) - (vy - this.centerDot.y) * Math.sin(this.angleRad) + this.centerDot.x
        this.vertix3.y = (vx - this.centerDot.x) * Math.sin(this.angleRad) + (vy - this.centerDot.y) * Math.cos(this.angleRad) + this.centerDot.y

        return this.vertix3
    }
}