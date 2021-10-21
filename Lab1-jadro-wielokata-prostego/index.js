const KernelAlgorithm = require("./algorithm");
const polygons = require("./testCases/data");

const executeAlgorithm = (polygon) => {
    const kernelAlgotithm = new KernelAlgorithm(polygon);
    kernelAlgotithm.execute(polygon);
}

executeAlgorithm(polygons[5]);