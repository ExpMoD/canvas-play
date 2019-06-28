class CollisionClass {
    static collisionBallAndCircle (ball, circle, circleRadius) {
        let curPosBall = ball.getPosition()

        if (Math.pow(curPosBall.x - circle.x, 2) + Math.pow(curPosBall.y - circle.y, 2) < Math.pow(ball.radius - circleRadius + 1, 2)) {
            console.log(false)
        } else {
            console.log(true)
        }
    }
}