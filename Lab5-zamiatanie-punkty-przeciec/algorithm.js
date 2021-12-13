const Point = require('./point');
const { plot } = require("nodeplotlib");
const findLastIndex = require('lodash/findLastIndex');

class SweepCrossingAlgorithm {

    intersectionPoints = [];
    plotParamsToDraw = [];

    // zmienne pomocne dla algorytmu
    numberOfIterations;
    nextHorizontalAction = 0;
    nextVerticalAction = 0;
    
    // Metoda sortująca odcinki
    sortSegments(segments) {
        return segments.sort(({ segment: a }, { segment: b }) => (
            a.firstPoint.x - b.firstPoint.x || a.firstPoint.y - b.firstPoint.y
        ));
    }

    // Metoda odpowiedzialna za wyznaczenie ile iteracji przeprowadzi algorytm
    defineLastIterationNumber(horizontal, vertical) {
        const lastHorizontalX = horizontal[horizontal.length - 1].segment.secondPoint.x;
        const lastVertcialX = vertical[vertical.length - 1].segment.secondPoint.x;

        return Math.max(lastHorizontalX, lastVertcialX)
    }

    // Metoda wyznaczająca iterację w której należy sprawdzić punkty poziome
    generateNewNextHorizontalAction(horizontalSegments, currentIteration) {
        const nextStartPoint = horizontalSegments.map(({ segment }) => segment.firstPoint.x).sort((a, b) => a - b).find(x => x > currentIteration)
        const nextEndPoint = horizontalSegments.map(({ segment }) => segment.secondPoint.x).sort((a, b) => a - b).find(x => x > currentIteration)

        const arrayToCompare = [];
        if (nextStartPoint) arrayToCompare.push(nextStartPoint)
        if (nextEndPoint) arrayToCompare.push(nextEndPoint)

        return arrayToCompare.length !== 0 ? Math.min(...arrayToCompare) : null
    }
 
    // Metoda wyznaczająca iterację w której należy sprawdzić punkty poziome
    generateNewNextVerticalAction(verticalSegments, currentIteration) {
        const nextVerticalPoint = verticalSegments.find(({ segment }) => (
            segment.firstPoint.x > currentIteration
        ))?.segment?.firstPoint?.x;

        return nextVerticalPoint || null
    }

    // Metoda, która dodaje punkt przecięcia do tablicy
    addIntersectionsPoints(segments, state, x) {
        const verticalSegment = segments.find(({ segment }) => segment.firstPoint.x === x);

        const min = verticalSegment.segment.firstPoint.y;
        const max = verticalSegment.segment.secondPoint.y;

        state.forEach(({ segment }) => {
            const { y } = segment.firstPoint
            if (y >= min && y <= max) {
                this.intersectionPoints.push(new Point(x, y))
            }
        })
    }

    // Metoda odpowiedzialna za dodanie odcinka do statusu miotły
    addSegmentToState(state, segmentToAdd) {
        if (state.length === 0) return [segmentToAdd]

        const yPositionsOfSegmentsInState = state.map(({ segment }) => segment.firstPoint.y);
        const indexOfFirstBiggerElement = findLastIndex(yPositionsOfSegmentsInState, y => segmentToAdd.segment.firstPoint.y < y);

        if (indexOfFirstBiggerElement === 0) {
            const copy = [...state];
            copy.splice(1, 0, segmentToAdd)
            return copy
        } else if (indexOfFirstBiggerElement === -1) {
            return [segmentToAdd, ...state];
        } else if (indexOfFirstBiggerElement === state.length - 1) {
            return [...state, segmentToAdd]; 
        } else {
            const copy = [...state];
            copy.splice(indexOfFirstBiggerElement + 1, 0, segmentToAdd)
            return copy
        }
    }

    // Metoda odpowiedzialna za usunięcie odcinka z statusu miotły
    removeSegmentFromState(state, segmentsToRemove) {
        return [...state].filter(({ tag }) => !segmentsToRemove.includes(tag))
    }

    sweep(horizontalSeg, verticalSeg, iteration, state) {
        if (iteration > this.numberOfIterations) return;

        let stateInThisIteration = [...state];
        const elementsToRemoveinInThisIteration = [];

        if (iteration === this.nextHorizontalAction) {
            if (iteration !== 0) {
                const segmentsWithThisX = horizontalSeg.filter(({ segment }) => {
                    const xValues = [segment.firstPoint.x, segment.secondPoint.x];
                    return xValues.includes(iteration)
                });
    
                const tagsAlreadyInState = [...state].map(({ tag }) => tag);
                segmentsWithThisX.forEach((element) => {
                    const isAlreadyInState = tagsAlreadyInState.includes(element.tag);
                    if (!isAlreadyInState) {
                        stateInThisIteration = this.addSegmentToState(stateInThisIteration, element)
                    } else {
                        elementsToRemoveinInThisIteration.push(element.tag);
                    }
                });
            }
        }

        if (iteration === this.nextVerticalAction) {
            if (iteration !== 0) this.addIntersectionsPoints(verticalSeg, stateInThisIteration, iteration)
            this.nextVerticalAction = this.generateNewNextVerticalAction(verticalSeg, iteration)
        }

        if (elementsToRemoveinInThisIteration.length > 0) {
            stateInThisIteration = this.removeSegmentFromState(stateInThisIteration, elementsToRemoveinInThisIteration)
        }

        this.nextHorizontalAction = this.generateNewNextHorizontalAction(horizontalSeg, iteration)

        const tagsInThisIteration = [...stateInThisIteration].map(({ tag }) => tag)
        console.log(`Iteracja numer: ${iteration} -> Stan ${tagsInThisIteration.join(', ')}`);
        this.sweep(horizontalSeg, verticalSeg, iteration + 1, stateInThisIteration)
    }

    execute(data) {
        const { horizontal, vertical } = data;

        const sortedData = {
            horizontal: this.sortSegments(horizontal),
            vertical: this.sortSegments(vertical)
        }

        this.numberOfIterations = this.defineLastIterationNumber(sortedData.horizontal, sortedData.vertical) + 1;

        this.sweep(sortedData.horizontal, sortedData.vertical, 0, []);

        this.drawVerticalSegments(sortedData.vertical)
        this.drawHorizontalSegments(sortedData.horizontal)
        this.drawIntersectionsPoints()
        plot(this.plotParamsToDraw, { title: 'Punkty przecięcia - metoda zamiatania' });
    }

    // Rysowanie
    drawVerticalSegments(segments) {
        segments.forEach(({ segment }) => {
            const length = segment.secondPoint.y - segment.firstPoint.y + 1;
            const xValues = Array(length).fill(segment.firstPoint.x);

            const yValues = [...Array(length).keys()].map(item => item + segment.firstPoint.y);

            this.plotParamsToDraw.push({
                x: xValues,
                y: yValues,
                mode: 'lines',
                line: {
                    color: 'rgb(79, 79, 79)',
                    width: 2
                },
                name: ''
            })
        })
    }

    drawHorizontalSegments(segments) {
        segments.forEach(({ segment }) => {
            const length = segment.secondPoint.x - segment.firstPoint.x + 1;
            const xValues = [...Array(length).keys()].map(item => item + segment.firstPoint.x);

            const yValues = Array(length).fill(segment.firstPoint.y);

            this.plotParamsToDraw.push({
                x: xValues,
                y: yValues,
                mode: 'lines',
                line: {
                    color: 'rgb(79, 79, 79)',
                    width: 2
                },
                name: ''
            })
        })
    }

    drawIntersectionsPoints() {
        this.intersectionPoints.forEach(({ x, y }) => {
            this.plotParamsToDraw.push({
                x: [x],
                y: [y],
                mode: 'markers',
                marker: {
                    color: 'rgb(180, 219, 72)',
                    size: 10
                },
                name: 'Punkt przecięć'
            })
        })
    }
}

module.exports = SweepCrossingAlgorithm;
