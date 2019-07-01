class AreaClass {
    constructor (centerDot, radius, backgroundColor, borderColor, borderSize) {
        this.centerDot = centerDot
        this.radius = radius
        this.backgroundColor = backgroundColor
        this.borderColor = borderColor
        this.borderSize = borderSize
    }

    setCenterDot (centerDot) {
        this.centerDot = centerDot
        return this
    }

    setRadius (radius) {
        this.radius = radius
        return this
    }
}