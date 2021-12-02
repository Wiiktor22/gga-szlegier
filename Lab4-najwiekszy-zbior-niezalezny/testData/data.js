const Node = require("../node4");

const testData = {
    root: new Node(
        20,
        [
            new Node(
                8,
                [
                    new Node(4, []),
                    new Node(
                        12,
                        [
                            new Node(10, []),
                            new Node(14, [])
                        ]
                    )
                ]
            ),
            new Node(
                22,
                [
                    new Node(25, [])
                ]
            )
        ]
    )
}

const testData2 = {
    root: new Node(
        18, 
        [
            new Node(
                10,
                [
                    new Node(3, []),
                    new Node(6, []),
                    new Node(
                        8,
                        [
                            new Node(7, []),
                            new Node(9, [])
                        ]
                    )
                ]
            ),
            new Node(
                29,
                [
                    new Node(22, []),
                    new Node(
                        38,
                        [
                            new Node(30, []),
                            new Node(40, [])
                        ]
                    )
                ]
            )
        ]
    )
}

module.exports = [
    testData,
    testData2
];
