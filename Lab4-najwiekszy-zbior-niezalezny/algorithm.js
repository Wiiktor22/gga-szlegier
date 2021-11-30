const arrayShuffle = require('./shuffleArray');

class IndependentSetAlgorithm {

    buildGraph(data) {
        const root = data.find(pObject => pObject.isRoot).point;

        console.log(data)
        
        const leftPoint = data.find(pObject => pObject.point < root);
        const rightPoint = data.find(pObject => pObject.point > root);

        console.log(leftPoint);
        console.log(rightPoint);
    }

    execute(data) {
        const randomizedData = arrayShuffle(data);
        this.buildGraph(randomizedData);

    }


}

module.exports = IndependentSetAlgorithm;
