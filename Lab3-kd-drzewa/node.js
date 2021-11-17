class Node {

    coord
    axis
    leftNodes
    rightNodes
    depth
    isLeaf

    constructor(coord, axis, leftNodes, rightNodes, depth, isLeaf) {
        this.coord = coord;
        this.axis = axis;
        this.leftNodes = leftNodes;
        this.rightNodes = rightNodes;
        this.depth = depth;
        this.isLeaf = isLeaf;
    }
    
}

module.exports = Node;
