const Segment = require('../segment');

const testCase1 = {
    horizontal: [
        { tag: 'A', segment: new Segment(3, 9, 11, 9) },
        { tag: 'B', segment: new Segment(6, 8, 26, 8) },
        { tag: 'C', segment: new Segment(1, 5, 8, 5) },
        { tag: 'D', segment: new Segment(22, 3, 32, 3) },
        { tag: 'E', segment: new Segment(2, 2, 20, 2) },
    ],
    vertical: [
        { segment: new Segment(10, 6, 10, 12) },
        { segment: new Segment(5, 2, 5, 12) },
        { segment: new Segment(16, 1, 16, 10) },
        { segment: new Segment(25, 7, 25, 9) },
        { segment: new Segment(31, 6, 31, 11) },
        { segment: new Segment(24, 2, 24, 10) },
    ]
};

module.exports = [
    testCase1
]
