const KDTreeAlgorithm = require("./algorithm");
const points = require("./testCases/data");

const executeAlgorithm = (points) => {
    const kdTreeAlgorithm = new KDTreeAlgorithm();
    kdTreeAlgorithm.execute(points);
}

executeAlgorithm(points[0]);