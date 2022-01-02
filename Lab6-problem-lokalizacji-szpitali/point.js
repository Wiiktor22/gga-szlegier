class Point {

    x
    y
    distance
    hospitalIndex

    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
        this.distance = null;
        this.hospitalIndex = null;
    }

    distanceFrom(point) {
        return Math.sqrt(Math.pow(point.x - this.x, 2) + Math.pow(point.y - this.y, 2))
    }

}

module.exports = Point;
