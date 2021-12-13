const SweepCrossingAlgorithm = require('./algorithm');
const testCases = require('./testCases/data');

const executeAlgorithm = (data) => {
    const algorithm = new SweepCrossingAlgorithm();
    algorithm.execute(data);
}

executeAlgorithm(testCases[4])
