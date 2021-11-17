const KDTreeAlgorithm = require("./algorithm");
const Area = require("./area");
const points = require("./testCases/data");

const executeAlgorithm = (points) => {
    const kdTreeAlgorithm = new KDTreeAlgorithm();
    const searchedArea = new Area(18, 3, 26, 12);

    kdTreeAlgorithm.execute(points, searchedArea);
}

executeAlgorithm(points[0]);