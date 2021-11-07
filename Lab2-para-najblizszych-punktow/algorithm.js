const { plot } = require("nodeplotlib");

class ClosestPairOfPointAlgorithm {

    totalNumberOfPoints
    plotParamsToDraw = [] // params for drawing final plot

    constructor(points) {
        this.totalNumberOfPoints = points.length
    }

    sortPointsByParameter(parameterName, pointsToSort) {
        const secondParameter = parameterName === 'x' ? 'y' : 'x';
        return [...pointsToSort].sort((a, b) => a[parameterName] - b[parameterName] || a[secondParameter] - b[secondParameter]);
    }

    // Funckja zwracają posortowane punkty według współrzędnej x i y
    sortPoints(points) {
        const pointsSortedByX = this.sortPointsByParameter('x', points)
        const pointsSortedByY = this.sortPointsByParameter('y', points)

        return { pointsSortedByX, pointsSortedByY }
    }

    // Funckja odpowiadająca za znalezienie najbliższych puntków
    lookForClosestPoint(pointsSortedByX, pointsSortedByY) {
        const numberOfPoints = pointsSortedByX.length;

        if (numberOfPoints <= 3) return this.lookForClosestPointInSmallGroup(pointsSortedByX);

        const pointToDivide = Math.floor(numberOfPoints / 2)

        const leftGroupOfPointsSortedByX = [];
        const rightGroupOfPointsSortedByX = [];

        [...pointsSortedByX].forEach((point, index) => {
            if (index < pointToDivide) leftGroupOfPointsSortedByX.push(point)
            else rightGroupOfPointsSortedByX.push(point)
        })

        const leftGroupOfPointsSortedByY = [];
        const rightGroupOfPointsSortedByY = [];

        const midPointX = pointsSortedByX[pointToDivide].x;
        [...pointsSortedByY].forEach(point => {
            if (point.x < midPointX) leftGroupOfPointsSortedByY.push(point)
            else rightGroupOfPointsSortedByY.push(point)
        })

        if ([...pointsSortedByX].length === this.totalNumberOfPoints) this.addDrawingParamsForBothGroup(leftGroupOfPointsSortedByX, rightGroupOfPointsSortedByX)

        const {
            p: pLeft,
            q: qLeft,
            distance: distanceLeft
        } = this.lookForClosestPoint(leftGroupOfPointsSortedByX, leftGroupOfPointsSortedByY);

        const {
            p: pRight,
            q: qRight,
            distance: distanceRight
        } = this.lookForClosestPoint(rightGroupOfPointsSortedByX, rightGroupOfPointsSortedByY);

        const distance = distanceLeft <= distanceRight ? distanceLeft : distanceRight;
        const pair = distanceLeft <= distanceRight ? [pLeft, qLeft] : [pRight, qRight];

        const { bestPair, bestDistance } = this.lookForClosestSplitPoint(
            pointsSortedByX,
            pointsSortedByY,
            distance,
            pair
        )

        if (distance <= bestDistance) {
            return {
                p: pair[0],
                q: pair[1],
                distance
            }
        } else {
            return {
                p: bestPair[0],
                q: bestPair[1],
                distance: bestDistance
            }
        }
    }

    // Funkcja szukająca najbliższej pary punktów w pasie delta
    lookForClosestSplitPoint(sortedXPoints, sortedYPoints, distance, pair) {
        const indexOfMiddleElement = Math.floor(sortedXPoints.length / 2);
        const xMiddlePoint = (sortedXPoints[indexOfMiddleElement - 1].x + sortedXPoints[indexOfMiddleElement].x) / 2

        const minBorderOfDeltaLand = xMiddlePoint - distance;
        const maxBorderOfDeltaLand = xMiddlePoint + distance;

        if (sortedXPoints.length === this.totalNumberOfPoints) {
            this.addDrawingParamsForDeltaLand(xMiddlePoint, minBorderOfDeltaLand, maxBorderOfDeltaLand)
        }

        const pointInDeltaLand = [...sortedYPoints].filter(point => (
            point.x >= minBorderOfDeltaLand && point.x <= maxBorderOfDeltaLand
        ));

        let bestPair = pair;
        let bestDistance = distance;

        const numberOfInsideIterations = Math.min(7, pointInDeltaLand.length - 1)

        for (let i = 0; i < pointInDeltaLand.length - 1; i++) {
            for (let j = i + 1; j <= numberOfInsideIterations; j++) {
                const calculatedDistance = this.calculateDistance(pointInDeltaLand[i], pointInDeltaLand[j])
                
                if (calculatedDistance < bestDistance) {
                    bestPair = [pointInDeltaLand[i], pointInDeltaLand[j]]
                    bestDistance = calculatedDistance
                }
            }
        }

        return { 
            bestPair, 
            bestDistance
        }
    }

    // Funkcja wyzanczająca najbliższe punkty wśród małej grupy punktów (2-3)
    lookForClosestPointInSmallGroup(points) {
        let distance = this.calculateDistance(points[0], points[1]);
        let pair = [points[0], points[1]];

        if (points.length === 2) {
            return {
                p: pair[0],
                q: pair[1],
                distance
            }
        }

        for (let i = 0; i < points.length; i++) {
            for (let j = i + 1; j < points.length; j++) {
                if (points[i].x === points[j].x && points[i].y === points[j].y) continue;

                const calculatedDistance = this.calculateDistance(points[i], points[j])
                if (calculatedDistance < distance) {
                    pair = [points[i], points[j]]
                    distance = calculatedDistance
                }
            }
        }

        return {
            p: pair[0],
            q: pair[1],
            distance
        }
    }

    // Funkcja odpowiadająca za obliczenie odległości na podstawie dostarczonych dwóch punktów
    calculateDistance(firstPoint, secondPoint) {
        return Math.sqrt(Math.pow(firstPoint.x - secondPoint.x, 2) + Math.pow(firstPoint.y - secondPoint.y, 2))
    }

    // Funkcja wywołująca algorytm
    execute(points) {
        const { pointsSortedByX, pointsSortedByY } = this.sortPoints(points);

        const { p, q, distance } = this.lookForClosestPoint(pointsSortedByX, pointsSortedByY);

        console.log('\nFinalnie najblizsze punkty to: ')
        console.log(p);
        console.log(q);
        console.log(`Ich dystans wynosi: ${distance}`)

        this.addDrawingParamsForClosestPair(p, q);
        plot(this.plotParamsToDraw, { title: 'Para najbliższych punktów' });
    }

    // Metody odpowiedzialne za rysowania wykresu
    addDrawingParamsForBothGroup(leftGroup, rightGroup) {
        console.log('Lewa grupa:');
        console.log(leftGroup);
        console.log('Prawa grupa');
        console.log(rightGroup);
        
        const leftXValues = leftGroup.map(point => point.x);
        const leftYValues = leftGroup.map(point => point.y);
        this.plotParamsToDraw.push({
            x: leftXValues,
            y: leftYValues,
            mode: 'markers',
            marker: {
                color: 'rgb(52, 82, 235)',
                size: 14
            },
            name: 'Lewa grupa'
        })

        const rightXValues = rightGroup.map(point => point.x);
        const rightYValues = rightGroup.map(point => point.y);
        this.plotParamsToDraw.push({
            x: rightXValues,
            y: rightYValues,
            mode: 'markers',
            marker: {
                color: 'rgb(235, 52, 70)',
                size: 14
            },
            name: 'Prawa grupa'
        })
    }

    addDrawingParamsForDeltaLand(middle, min, max) {
        const yValues = [];
        for (let i = 0; i < 30; i++) {
            yValues.push(i);
        }

        this.plotParamsToDraw.push({
            x: Array(30).fill(min),
            y: yValues,
            type: 'line',
            line: {
                color: 'rgb(54, 54, 54)',
                width: 2
            },
            name: 'Granica delta'
        })

        this.plotParamsToDraw.push({
            x: Array(30).fill(max),
            y: yValues,
            type: 'line',
            line: {
                color: 'rgb(54, 54, 54)',
                width: 2
            },
            name: 'Granica delta'
        })

        this.plotParamsToDraw.push({
            x: Array(30).fill(middle),
            y: yValues,
            type: 'line',
            line: {
                color: 'rgb(54, 54, 54)',
                width: 2
            },
            name: 'Prosta l'
        })
    }

    addDrawingParamsForClosestPair(p, q) {
        const xValues = [p, q].map(point => point.x);
        const yValues = [p, q].map(point => point.y);

        this.plotParamsToDraw.push({
            x: xValues,
            y: yValues,
            mode: 'lines',
            line: {
                color: 'rgb(66, 173, 245)',
                width: 3
            },
            name: 'Para najbliszych punktów'
        })
    }
}

module.exports = ClosestPairOfPointAlgorithm
