class KDTreeAlgorithm {

    paramsToDraw = [];


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

        console.log('Wpada ' + depth);

        if (pointsSortedByX.length === 1) {
            console.log('Koniec');
            return
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

        this.buildTree({
            pointsSortedByX: leftOrDownGroupSortedByX,
            pointsSortedByY: leftOrDownGroupSortedByY,
        }, depth + 1)
        this.buildTree({
            pointsSortedByX: rightOrUpGroupSortedByX,
            pointsSortedByY: rightOrUpGroupSortedByY
        }, depth + 1)
    }

    getSortedPointed(pointsToSort) {
        const pointsSortedByX = [...pointsToSort].sort((a, b) => a.x - b.x || a.y - b.y);
        const pointsSortedByY = [...pointsToSort].sort((a, b) => a.y - b.y || a.x - b.x);
        return {
            pointsSortedByX,
            pointsSortedByY
        }
    }

    execute(points) {
        const sortedPointsObject = this.getSortedPointed(points);

        this.buildTree(sortedPointsObject);
        console.log(this.paramsToDraw);
    }
}

module.exports = KDTreeAlgorithm
