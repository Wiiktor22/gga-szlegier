const KCenterProblemAlgorithm = require('./algorithm');
const testCases = require('./testCases/data');

const executeAlgorithm = (data) => {
    const algorithm = new KCenterProblemAlgorithm();

    const numberOfHospitals = 4;
    algorithm.execute(numberOfHospitals, data);
}

executeAlgorithm(testCases[1])