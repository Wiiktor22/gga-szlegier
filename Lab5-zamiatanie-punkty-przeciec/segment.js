
class Segment {

    firstPoint
    secondPoint

    constructor(x1, y1, x2, y2) {
        this.firstPoint = {
            x: x1,
            y: y1
        }
        this.secondPoint = {
            x: x2,
            y: y2
        }
    }
};

module.exports = Segment;
