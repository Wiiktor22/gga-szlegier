const { plot } = require("nodeplotlib");

class KernelAlgorithm {

    // Deklaracja zmiennych potrzebnych do prawidłowego działania algorytmu
    topVertice;
    bottomVertice;

    // Konstruktor klasy
    constructor(vertices) {
        const { top, bottom } = this.getBottomAndTopVertices(vertices);

        this.topVertice = top;
        this.bottomVertice = bottom;
    }

    // Funckja szukająca najniższego i najwyższego wierzchołka
    getBottomAndTopVertices(vertices) {
        let indexOfTopVertice;
        let indexOfBottomVertice;

        const yValuesOfVertices = vertices.map(vertice => vertice.y);

        yValuesOfVertices.forEach((yValue, index) => {
            if (index === 0) {
                indexOfTopVertice = index;
                indexOfBottomVertice = index;
                return;
            }

            if (yValue > yValuesOfVertices[indexOfTopVertice]) {
                indexOfTopVertice = index;
            } else if (yValue < yValuesOfVertices[indexOfBottomVertice]) {
                indexOfBottomVertice = index
            }
        });

        console.log('-------------------------------------');
        console.log('Inicjalny punkt minimum:');
        console.log(vertices[indexOfTopVertice]);
        console.log('Inicjalny punkt maximum:');
        console.log(vertices[indexOfBottomVertice]);

        return {
            top: vertices[indexOfTopVertice],
            bottom: vertices[indexOfBottomVertice]
        };
    }

    // Funckja szukająca minimum lokalnego
    getMinFromTopVertices(vertices) {
        if (vertices.length === 1) return vertices[0];

        let indexOfSearchedElement;

        const yValuesOfVertices = vertices.map(vertice => vertice.y);
        yValuesOfVertices.forEach((yValue, index) => {
            if (index === 0) {
                indexOfSearchedElement = index;
            } else if (yValue < yValuesOfVertices[indexOfSearchedElement]) {
                indexOfSearchedElement = index;
            }
        });

        return vertices[indexOfSearchedElement];
    }

    // Funckja szukająca maximum lokalnego
    getMaxFromBottomVertices(vertices) {
        if (vertices.length === 1) return vertices[0];

        let indexOfSearchedElement;

        const yValuesOfVertices = vertices.map(vertice => vertice.y);
        yValuesOfVertices.forEach((yValue, index) => {
            if (index === 0) {
                indexOfSearchedElement = index;
            } else if (yValue > yValuesOfVertices[indexOfSearchedElement]) {
                indexOfSearchedElement = index;
            }
        });

        return vertices[indexOfSearchedElement];
    }

    // Obliczenie wyznacznika macierzy metodą Sariusa (macierze zawsze będzie 3x3)
    checkIfIsTurningRight(previousPoint, currentPoint, nextPoint) {
        const det = (
            (previousPoint.x * currentPoint.y * 1)
            +
            (previousPoint.y * 1 * nextPoint.x)
            +
            (1 * currentPoint.x * nextPoint.y)
            -
            (
                (1 * currentPoint.y * nextPoint.x)
                +
                (previousPoint.x * 1 * nextPoint.y)
                +
                (previousPoint.y * currentPoint.x * 1)
            )
        );
        return det < 0
    }


    // Funkcja sprawdzająca orientację punktu oraz "skręt"
    getOrientationOfThePoint(vertices, index) {
        const previousPoint = index === 0 ? vertices[vertices.length - 1] : vertices[index - 1];
        const currentPoint = vertices[index];
        const nextPoint = index === vertices.length - 1 ? vertices[0] : vertices[index + 1];

        if (!this.checkIfIsTurningRight(previousPoint, currentPoint, nextPoint)) return;

        if (currentPoint.y < previousPoint.y && currentPoint.y <= nextPoint.y) {
            return 'top';
        } else if (currentPoint.y > previousPoint.y && currentPoint.y >= nextPoint.y) {
            return 'bottom';
        }
    }

    // Metoda sprawdzająca czy dany wielokąt posiada jądro
    checkIfPolygonHasKernel(vertices) {
        const topVertices = [];
        const bottomVertices = [];

        vertices.forEach((vertice, index) => {
            const orientationOfPoint = this.getOrientationOfThePoint(vertices, index);

            if (orientationOfPoint === 'top') {
                topVertices.push(vertice);
            } else if (orientationOfPoint === 'bottom') {
                bottomVertices.push(vertice);
            }
        });

        console.log('-------------------------------------');
        console.log('Znalezione górne wierzchołki spełniające warunki:')
        console.log(topVertices);
        console.log('Znalezione dolne wierzchołki spełniające warunki:')
        console.log(bottomVertices);

        if (topVertices.length > 0) this.topVertice = this.getMinFromTopVertices(topVertices) ;
        if (bottomVertices.length > 0) this.bottomVertice = this.getMaxFromBottomVertices(bottomVertices);

        console.log('-------------------------------------');
        console.log('Minimum lokalne:')
        console.log(this.topVertice);
        console.log('Maximum lokalne:')
        console.log(this.bottomVertice);

        return this.topVertice.y >= this.bottomVertice.y;
    }

    drawPolygon(vertices, doesPolygonHasKernel) {
        const xValues = vertices.map(vertice => vertice.x);
        const yValues = vertices.map(vertice => vertice.y);

        const plotParams = [{
            x: xValues,
            y: yValues,
            type: 'lines+markers',
            line: {
                color: 'rgb(141, 153, 174)',
                width: 2
            },
            name: 'Wielokąt'
        }, {
            x: [this.topVertice.x],
            y: [this.topVertice.y],
            type: 'markers',
            marker: {
                color: 'rgb(255, 214, 10)',
                size: 14
            },
            name: 'Minimum'
        }, {
            x: [this.bottomVertice.x],
            y: [this.bottomVertice.y],
            mode: 'markers',
            marker: {
                color: 'rgb(186, 24, 27)',
                size: 14
            },
            name: 'Maximum'
        }];

        if (doesPolygonHasKernel) {
            const xValues = [];
            for (let i = 0; i < 20; i++) {
                xValues.push(i);
            }

            plotParams.push({
                x: xValues,
                y: Array(20).fill(this.topVertice.y),
                type: 'line',
                line: {
                    color: 'rgb(255, 214, 10)',
                    width: 2
                },
                name: 'Granica'
            });
            plotParams.push({
                x: xValues,
                y: Array(20).fill(this.bottomVertice.y),
                type: 'line',
                line: {
                    color: 'rgb(186, 24, 27)',
                    width: 2
                },
                name: 'Granica'
            })
        }

        const finalMessage = doesPolygonHasKernel ?
            'Wielokąt posiada jądro' : 'Wielokąt nie posiada jądra';
        plot(plotParams, { title: finalMessage });
    }

    execute(vertices) {
        const doesPolygonHasKernel = this.checkIfPolygonHasKernel(vertices);
        const finalMessage = doesPolygonHasKernel ?
            'Wielokąt posiada jądro' : 'Wielokąt nie posiada jądra';

        console.log('-------------------------------------');
        console.log(finalMessage);
        console.log('-------------------------------------');

        this.drawPolygon([...vertices, vertices[0]], doesPolygonHasKernel)
    }

}

module.exports = KernelAlgorithm;
