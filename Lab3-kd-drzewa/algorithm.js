const Node = require('./node');
const Area = require('./area');

class KDTreeAlgorithm {

    paramsToDraw = [];
    nodes = [];
    foundedPoints = [];

    getIndexOfMedianPoint(points) {
        const potentialMedianIndex = Math.floor(points.length / 2);
        return points.length % 2 === 0 ? potentialMedianIndex - 1 : potentialMedianIndex;
    }

    splitPoints(points, median, axis) {
        const medianValueToSplit = median[axis];

        const leftOrDownGroup = [];
        const rightOrUpGroup = [];

        [...points].forEach((point) => {
            if (point[axis] <= medianValueToSplit) leftOrDownGroup.push(point)
            else rightOrUpGroup.push(point)
        })

        return {
            leftOrDownGroup,
            rightOrUpGroup
        }
    }

    buildTree(pointsObject, depth = 0) {
        const { pointsSortedByX, pointsSortedByY } = pointsObject;
        const axis = depth % 2 === 0 ? 'x' : 'y';

        if (pointsSortedByX.length === 1) {
            return new Node(pointsSortedByX[0], axis, [], [], true)
        }

        const pointsForCurrentAxis = axis === 'x' ? pointsSortedByX : pointsSortedByY;

        const medianIndex = this.getIndexOfMedianPoint(pointsForCurrentAxis);
        const medianPoint = pointsForCurrentAxis[medianIndex];

        this.paramsToDraw.push({ [axis]: medianPoint[axis] })

        const {
            leftOrDownGroup: leftOrDownGroupSortedByX,
            rightOrUpGroup: rightOrUpGroupSortedByX
        } = this.splitPoints(pointsSortedByX, medianPoint, axis);

        const {
            leftOrDownGroup: leftOrDownGroupSortedByY,
            rightOrUpGroup: rightOrUpGroupSortedByY
        } = this.splitPoints(pointsSortedByY, medianPoint, axis);

        const testL = this.buildTree({
            pointsSortedByX: leftOrDownGroupSortedByX,
            pointsSortedByY: leftOrDownGroupSortedByY,
        }, depth + 1)
        const testR = this.buildTree({
            pointsSortedByX: rightOrUpGroupSortedByX,
            pointsSortedByY: rightOrUpGroupSortedByY
        }, depth + 1)

        return new Node({ [axis]: medianPoint[axis] }, axis, testL, testR, false)
    }

    getSortedPointed(pointsToSort) {
        const pointsSortedByX = [...pointsToSort].sort((a, b) => a.x - b.x || a.y - b.y);
        const pointsSortedByY = [...pointsToSort].sort((a, b) => a.y - b.y || a.x - b.x);
        return {
            pointsSortedByX,
            pointsSortedByY
        }
    }

    findPointsInArea(tree, searchedArea) {
        const { minX, minY, maxX, maxY } = searchedArea;

        console.log(tree)
        console.log('-------------')

        const { coord, axis, leftNodes, rightNodes, isLeaf } = tree;

        if (isLeaf) {
            const isThisPointInArea = Area.checkIfPointIsInTheArea(searchedArea, coord);
            if (isThisPointInArea) this.foundedPoints.push(coord)
            return
        }

        const pointsToCheck = axis === 'x' ? [minX, maxX] : [minY, maxY];

        if (coord[axis] > pointsToCheck[0] && coord[axis] > pointsToCheck[1]) {
            this.findPointsInArea(leftNodes, searchedArea);
        } else if (coord[axis] < pointsToCheck[0] && coord[axis] < pointsToCheck[1]) {
            this.findPointsInArea(rightNodes, searchedArea);
        } else {
            this.findPointsInArea(leftNodes, searchedArea);
            this.findPointsInArea(rightNodes, searchedArea);
        }
    }

    execute(points) {
        const sortedPointsObject = this.getSortedPointed(points);

        const tree = this.buildTree(sortedPointsObject);

        const searchedArea = new Area(10, 3, 13, 6);
        this.findPointsInArea(tree, searchedArea);

        console.log(this.foundedPoints)
    }
}

module.exports = KDTreeAlgorithm
