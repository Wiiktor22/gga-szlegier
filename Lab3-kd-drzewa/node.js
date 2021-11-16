class Node {

    coord
    leftOrBottomPoints
    rightOrBottomPoints
    depth
    isLeaf

    constructor(coord, leftOrBottomPoints, rightOrBottomPoints, depth, isLeaf) {
        this.coord = coord;
        this.leftOrBottomPoints = leftOrBottomPoints;
        this.rightOrBottomPoints = rightOrBottomPoints;
        this.depth = depth;
        this.isLeaf = isLeaf;
    }

    static getDirectionOfPoint(nodes, point, depth) {
        if (depth === 1) {
            const isNodeWithDepth1AlreadySaved = nodes.some(node => node.depth === 1);
            return isNodeWithDepth1AlreadySaved ? 'rightOrTop' : 'leftOrBottom';
        } else {
            const reservedNodes = [...nodes].reverse();
            const elementToCompare = reservedNodes
        }
    }

}

module.exports = Node;
