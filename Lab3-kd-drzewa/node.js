class Node {

    coord
    axis
    leftNodes
    rightNodes
    isLeaf

    constructor(coord, axis, leftNodes, rightNodes, isLeaf) {
        this.coord = coord;
        this.axis = axis;
        this.leftNodes = leftNodes;
        this.rightNodes = rightNodes;
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
