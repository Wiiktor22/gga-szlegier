const ClosestPairOfPointAlgorithm = require('./algorithm');
const points = require("./testCases/data");
const lecturePoints = require("./testCases/lectureData");

const executeAlgorithm = (points) => {
    const closestPointAlgorith = new ClosestPairOfPointAlgorithm(points);
    closestPointAlgorith.execute(points);
}

executeAlgorithm(lecturePoints[0]);
