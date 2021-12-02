const IndependentSetAlgorithm = require("./algorithm");
const testData = require("./testData/data");

const executeAlgorithm = (data) => {
    const independentSetAlgorithm = new IndependentSetAlgorithm();

    independentSetAlgorithm.execute(data);
}

executeAlgorithm(testData[1])
