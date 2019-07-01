class CollisionClass {
    static collisionBallAndArea(ball, area) {
        return (Math.pow(ball.dot.x - area.centerDot.x, 2) + Math.pow(ball.dot.y - area.centerDot.y, 2) >= Math.pow(ball.radius - area.radius + area.borderSize, 2));
    }

    static getIntersectionAreaDot(ball, area) {
        let radianIntersection = Math.atan2(area.centerDot.y - ball.dot.y, area.centerDot.x - ball.dot.x) - Math.PI

        return new DotClass(
            area.radius * Math.cos(radianIntersection) + area.centerDot.x,
            area.radius * Math.sin(radianIntersection) + area.centerDot.y
        )
    }

    static getDegreeCollisionAreaDot(ball, area) {
        let radianIntersection = Math.atan2(area.centerDot.y - ball.dot.y, area.centerDot.x - ball.dot.x) - Math.PI / 2
        return 2 * (radianIntersection * 180 / Math.PI) - ball.angle
    }
}