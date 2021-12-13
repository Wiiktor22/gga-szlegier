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

const testCase2 = {
    horizontal: [
        { tag: 'A', segment: new Segment(2, 20, 10, 20 ) },
        { tag: 'B', segment: new Segment(3, 17, 9, 17 ) },
        { tag: 'C', segment: new Segment(2, 14, 10, 14 ) },
        { tag: 'D', segment: new Segment(3, 10, 9, 10 ) },
        { tag: 'E', segment: new Segment(2, 7, 10, 7 ) },
        { tag: 'F', segment: new Segment(3, 4, 9, 4 ) },
    ],
    vertical: [
        { segment: new Segment(6, 1, 6, 24) },
    ]
};

const testCase3 = {
    horizontal: [
        { tag: 'A', segment: new Segment(2, 2, 10, 2 ) },
        { tag: 'B', segment: new Segment(2, 5, 10, 5 ) },
        { tag: 'C', segment: new Segment(2, 8, 10, 8 ) },
        { tag: 'D', segment: new Segment(2, 11, 10, 11 ) },
        { tag: 'E', segment: new Segment(10, 7, 18, 7 ) },
        { tag: 'F', segment: new Segment(10, 3, 18, 3 ) },
        { tag: 'G', segment: new Segment(10, 11, 18, 11 ) },
        { tag: 'H', segment: new Segment(10, 2, 18, 2 ) },
    ],
    vertical: [
        { segment: new Segment(2, 2, 2, 11) },
        { segment: new Segment(10, 2, 10, 11) },
        { segment: new Segment(18, 2, 18, 11) },
    ]
};

const testCase4 = {
    horizontal: [
        { tag: 'A', segment: new Segment(10, 12, 10, 12 ) },
        { tag: 'B', segment: new Segment(10, 5, 10, 5 ) },
        { tag: 'C', segment: new Segment(10, 18, 10, 18 ) },
        { tag: 'D', segment: new Segment(10, 2, 10, 2 ) },
        { tag: 'E', segment: new Segment(10, 14, 10, 14 ) },
    ],
    vertical: [
        { segment: new Segment(10, 2, 10, 20) },
    ]
}

const testCase5 = {
    horizontal: [
        { tag: 'A', segment: new Segment(2, 4, 26, 4 ) },
    ],
    vertical: [
        { segment: new Segment(4, 4, 4, 4) },
        { segment: new Segment(6, 4, 6, 4) },
        { segment: new Segment(12, 4, 12, 4) },
        { segment: new Segment(8, 4, 8, 4) },
        { segment: new Segment(23, 4, 23, 4) },
        { segment: new Segment(19, 4, 19, 4) },
    ]
}

module.exports = [
    testCase1,
    testCase2,
    testCase3,
    testCase4,
    testCase5
]
