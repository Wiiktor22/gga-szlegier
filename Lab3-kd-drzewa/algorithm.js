const Node = require('./node');
const Area = require('./area');
const { plot } = require("nodeplotlib");

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
        console.log(medianValueToSplit)

        const leftOrDownGroup = [];
        const rightOrUpGroup = [];

        const halfThePoints = points.length / 2;

        [...points].forEach((point) => {
            if (point[axis] <= medianValueToSplit && leftOrDownGroup.length < halfThePoints) leftOrDownGroup.push(point)
            else rightOrUpGroup.push(point)
        })

        console.log('----------')
        console.log(points)
        console.log(leftOrDownGroup);
        console.log(rightOrUpGroup);

        return {
            leftOrDownGroup,
            rightOrUpGroup
        }
    }

    buildTree(pointsObject, depth = 0) {
        const { pointsSortedByX, pointsSortedByY } = pointsObject;
        const axis = depth % 2 === 0 ? 'x' : 'y';

        if (pointsSortedByX.length === 1) {
            return new Node(pointsSortedByX[0], axis, [], [], depth, true)
        }

        if (pointsSortedByX.length === 0) {

        }

        const pointsForCurrentAxis = axis === 'x' ? pointsSortedByX : pointsSortedByY;

        const medianIndex = this.getIndexOfMedianPoint(pointsForCurrentAxis);
        const medianPoint = pointsForCurrentAxis[medianIndex];

        // console.log(pointsSortedByX);
        // console.log(pointsSortedByY);

        // console.log('----------')
        // console.log(pointsForCurrentAxis)
        // console.log(medianPoint)
        // console.log(depth);
        // console.log(axis)


        const {
            leftOrDownGroup: leftOrDownGroupSortedByX,
            rightOrUpGroup: rightOrUpGroupSortedByX
        } = this.splitPoints(pointsSortedByX, medianPoint, axis);

        const {
            leftOrDownGroup: leftOrDownGroupSortedByY,
            rightOrUpGroup: rightOrUpGroupSortedByY
        } = this.splitPoints(pointsSortedByY, medianPoint, axis);

        const pointsLeft = this.buildTree({
            pointsSortedByX: leftOrDownGroupSortedByX,
            pointsSortedByY: leftOrDownGroupSortedByY,
        }, depth + 1)
        const pointsRight = this.buildTree({
            pointsSortedByX: rightOrUpGroupSortedByX,
            pointsSortedByY: rightOrUpGroupSortedByY
        }, depth + 1)

        return new Node({ [axis]: medianPoint[axis] }, axis, pointsLeft, pointsRight, depth, false)
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

    execute(points, searchedArea) {
        const sortedPointsObject = this.getSortedPointed(points);

        const tree = this.buildTree(sortedPointsObject);
        
        this.findPointsInArea(tree, searchedArea);

        this.addParamsForDrawingBorders(tree, undefined, undefined)
        this.addParamsForDrawingPoints(points);
        this.addParamsForDrawingArea(searchedArea);
        this.addParamsForDrawingFoundedPoints(this.foundedPoints);

        plot(this.paramsToDraw, { title: 'KD Tree' });
    }

    addParamsForDrawingPoints(points) {
        const xValues = points.map(point => point.x);
        const yValues = points.map(point => point.y);
        this.paramsToDraw.push({
            x: xValues,
            y: yValues,
            mode: 'markers',
            marker: {
                color: 'rgb(82, 84, 83)',
                size: 8
            },
            name: 'Punkty'
        })
    }

    addParamsForDrawingArea(area) {
        const { minX, minY, maxX, maxY } = area;

        const points = [
            { x: minX, y: minY },
            { x: maxX, y: minY },
            { x: maxX, y: maxY },
            { x: minX, y: maxY },
            { x: minX, y: minY },
        ];
        const xValues = points.map(point => point.x);
        const yValues = points.map(point => point.y);

        this.paramsToDraw.push({
            x: xValues,
            y: yValues,
            mode: 'lines',
            line: {
                color: 'rgb(252, 79, 48)',
                width: 2
            },
            name: 'Przeszukiwana przestrzen'
        })
    }

    addParamsForDrawingBorders(tree, parent, direction) {
        const { coord, axis, leftNodes, rightNodes, depth, isLeaf } = tree;

        if (isLeaf || Object.keys(coord).length > 1) return

        if (depth === 0) {
            const xVal = Array(30).fill(coord[axis])
            const yVal = [...Array(30).keys()]
            
            this.paramsToDraw.push({
                x: xVal,
                y: yVal,
                mode: 'lines',
                line: {
                    color: 'rgb(67, 178, 222)',
                    width: 2
                },
                name: 'Granica'
            })
        } else {
            let xVal = [];
            let yVal = [];

            const reverseAxis = axis === 'x' ? 'y' : 'x';

            if (direction === 'left') {
                if (axis === 'y') yVal = Array(parent[reverseAxis] + 1).fill(coord[axis])
                else xVal = Array(parent[reverseAxis] + 1).fill(coord[axis])
            } else {
                if (axis === 'y') yVal = Array(30 - parent[reverseAxis]).fill(coord[axis])
                else xVal = Array(30 - parent[reverseAxis]).fill(coord[axis])
            }

            if (axis === 'y') {
                if (direction === 'left') {
                    for (let i = 0; i < parent[reverseAxis] + 1; i++) {
                        xVal.push(i)
                    }
                } else {
                    for (let i = parent[reverseAxis]; i <= 30; i++) {
                        xVal.push(i)
                    }
                }
            } else {
                if (direction === 'left') {
                    for (let i = 0; i < parent[reverseAxis] + 1; i++) {
                        yVal.push(i)
                    }
                } else {
                    for (let i = parent[reverseAxis]; i <= 30; i++) {
                        yVal.push(i)
                    }
                }
            }

            this.paramsToDraw.push({
                x: xVal,
                y: yVal,
                mode: 'lines',
                line: {
                    color: 'rgb(67, 178, 222)',
                    width: 2
                },
                name: 'Granica'
            })
        }

        if (leftNodes) this.addParamsForDrawingBorders(leftNodes, { ...coord }, 'left');
        if (rightNodes) this.addParamsForDrawingBorders(rightNodes, { ...coord }, 'right');
    }

    addParamsForDrawingFoundedPoints(points) {
        const xValues = points.map(point => point.x);
        const yValues = points.map(point => point.y);
        this.paramsToDraw.push({
            x: xValues,
            y: yValues,
            mode: 'markers',
            marker: {
                color: 'rgb(235, 112, 30)',
                size: 8
            },
            name: 'Punkty'
        })
    }
}

module.exports = KDTreeAlgorithm
