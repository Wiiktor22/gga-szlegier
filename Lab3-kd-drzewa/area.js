class Area {

    minX
    minY
    maxX
    maxY

    constructor(minX, minY, maxX, maxY) {
        this.minX = minX;
        this.minY = minY;
        this.maxX = maxX;
        this.maxY = maxY;
    }

    static checkIfPointIsInTheArea(area, point) {
        const { minX, minY, maxX, maxY } = area;

        if (
            point.x >= minX && point.x <= maxX
            &&
            point.y >= minY && point.y <= maxY
        ) {
            return true
        } else {
            return false
        }
    }

}

module.exports = Area;
