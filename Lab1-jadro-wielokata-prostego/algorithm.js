
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
        console.log(`Inicjalny punkt minimum: ${JSON.stringify(vertices[indexOfTopVertice])}`);
        console.log(`Inicjalny punkt maximum: ${JSON.stringify(vertices[indexOfBottomVertice])}`)

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
            } else if (yValue < yValuesOfVertices[indexOfSearchedValue]) {
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
            } else if (yValue > yValuesOfVertices[indexOfSearchedValue]) {
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

        if (currentPoint.x === 4 && currentPoint.y === 11) console.log(this.checkIfIsTurningRight(previousPoint, currentPoint, nextPoint))

        if (!this.checkIfIsTurningRight(previousPoint, currentPoint, nextPoint)) return;

        if (currentPoint.y < previousPoint.y && currentPoint.y <= nextPoint.y) {
            return 'top';
        } else if (currentPoint.y > previousPoint.y && currentPoint.y >= nextPoint.y) {
            return 'bottom';
        }
    }

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

        let topVertice = topVertices.length > 0 ? this.getMinFromTopVertices(topVertices) : undefined;
        let bottomVertice = bottomVertices.length > 0 ? this.getMaxFromBottomVertices(bottomVertices) : undefined;

        if (topVertice === undefined) topVertice = this.topVertice;
        if (bottomVertice === undefined) bottomVertice = this.bottomVertice;
        
        console.log('-------------------------------------');
        console.log('Minimum lokalne:')
        console.log(topVertice);
        console.log('Maximum lokalne:')
        console.log(bottomVertice);

        return topVertice.y >= bottomVertice.y;
    }

    execute(vertices) {
        const doesPolygonHasKernel = this.checkIfPolygonHasKernel(vertices);
        const finalMessage = doesPolygonHasKernel ? 
            'Wielokąt posiada jądro' : 'Wielokąt nie posiada jądra';

        console.log('-------------------------------------');
        console.log(finalMessage);
    }

}

module.exports = KernelAlgorithm;
