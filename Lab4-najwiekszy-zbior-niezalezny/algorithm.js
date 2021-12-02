class IndependentSetAlgorithm {

    listOfNeighboards = [];

    addItemIntoListOfNeighboards(node, parentNode) {
        const { tag, children } = node;
        const alreadySavedTags = this.listOfNeighboards.map(item => item.name)
        if (alreadySavedTags.includes(tag)) return;

        const childrenTags = children.map(node => node.tag);
        this.listOfNeighboards.push({
            name: tag,
            neighboards: parentNode ? [parentNode.tag, ...childrenTags] : [...childrenTags]
        })
    }

    findLargestIndependentSet(node, parentNode) {
        this.addItemIntoListOfNeighboards(node, parentNode);

        if (node.children.length === 0) return 1;

        let sizeExcludingNode = 0
        node.children.forEach(childrenNode => {
            sizeExcludingNode += this.findLargestIndependentSet(childrenNode, node)
        });

        let sizeIncludingNode = 1;
        node.children.forEach(childrenNode => {
            childrenNode?.children?.forEach(grandChildrenNode => {
                sizeIncludingNode += this.findLargestIndependentSet(grandChildrenNode, node);
            })
        })

        return Math.max(sizeExcludingNode, sizeIncludingNode);
    }

    execute(graph) {
        const largestIndependentSet = this.findLargestIndependentSet(graph.root, null);

        console.log(`Największy zbiór niezależny: ${largestIndependentSet}`);
        console.log(this.listOfNeighboards)
    }

}

module.exports = IndependentSetAlgorithm;
