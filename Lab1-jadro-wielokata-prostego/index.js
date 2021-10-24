const KernelAlgorithm = require("./algorithm");
const polygons = require("./testCases/data");
const lecturePolygons = require('./testCases/lectureData');

const executeAlgorithm = (polygon) => {
    const kernelAlgotithm = new KernelAlgorithm(polygon);
    kernelAlgotithm.execute(polygon);
}

executeAlgorithm(lecturePolygons[4]);