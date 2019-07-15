class CollisionClass {
    static checkCollisionBallAndArea(ball, area) {
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

    static checkPossiblePolygonCollision(ball, polygon) {
        let tempLineSize, toDot, rr, am, bm, eq, det, d, root1, root2

        tempLineSize = $('body').width()

        toDot = new DotClass(
            ball.dot.x + tempLineSize * Math.cos(ball.angle * Math.PI / 180),
            ball.dot.y + tempLineSize * Math.sin(ball.angle * Math.PI / 180)
        )

        rr = Math.pow(polygon.size, 2)
        am = new DotClass(ball.dot.x - polygon.centerDot.x, ball.dot.y - polygon.centerDot.y)
        bm = new DotClass(toDot.x - polygon.centerDot.x, toDot.y - polygon.centerDot.y)
        eq = [
            am.x * am.x + am.y * am.y - rr,
            am.x * bm.x + am.y * bm.y - rr,
            bm.x * bm.x + bm.y * bm.y - rr
        ]
        det = eq[1] * eq[1] - eq[0] * eq[2]

        if (eq[0] <= 0 || eq[2] <= 0) return true;
        if (det < 0) return false;

        d = Math.sqrt(det)
        root1 = (-eq[1] - d) / eq[2]
        root2 = (-eq[1] + d) / eq[2]

        if (root1 >= 0 || root2 >= 0) return true;
        else return false
    }

    static checkPolygonCollision(ball, polygon) {
        let polygonVertices = polygon.getVertices(),
            closestFace, rr, am, bm, eq, det, d, root1, root2

        let tempDistances = [],
            tempFaces = []
        polygonVertices.forEach((dot, index, arr) => {
            let face = []
            if (index < arr.length - 1) {
                face.push(arr[index], arr[index + 1])
            } else {
                face.push(arr[index], arr[0])
            }

            tempDistances.push(
                Math.sqrt(Math.pow(face[0].x - ball.dot.x, 2) + Math.pow(face[0].y - ball.dot.y, 2)) +
                Math.sqrt(Math.pow(face[1].x - ball.dot.x, 2) + Math.pow(face[1].y - ball.dot.y, 2))
            )
            tempFaces.push(face)
        })

        closestFace = tempFaces[tempDistances.indexOf(Math.min(...tempDistances))]

        rr = Math.pow(ball.radius, 2)
        am = new DotClass(closestFace[0].x - ball.dot.x, closestFace[0].y - ball.dot.y)
        bm = new DotClass(closestFace[1].x - ball.dot.x, closestFace[1].y - ball.dot.y)
        eq = [
            am.x * am.x + am.y * am.y - rr,
            am.x * bm.x + am.y * bm.y - rr,
            bm.x * bm.x + bm.y * bm.y - rr
        ]
        det = eq[1] * eq[1] - eq[0] * eq[2]

        if (eq[0] <= 0 || eq[2] <= 0) return closestFace;
        if (det < 0) return false;

        d = Math.sqrt(det)
        root1 = (-eq[1] - d) / eq[2]
        root2 = (-eq[1] + d) / eq[2]

        if (root1 >= 0 || root2 >= 0) return closestFace;
        else return false
    }

    static getDegreePolygonCollision(ball, dots) {
        let radianIntersection = Math.atan2(dots[0].y - dots[1].y, dots[0].x - dots[1].x)
        return 2 * (radianIntersection * 180 / Math.PI) - ball.angle
    }
}