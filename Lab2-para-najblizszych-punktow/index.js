const ClosestPairOfPointAlgorithm = require('./algorithm');
const points = require("./testCases/data");

const executeAlgorithm = (points) => {
    const closestPointAlgorith = new ClosestPairOfPointAlgorithm(points);
    closestPointAlgorith.execute(points);
}

executeAlgorithm(points[4]);
