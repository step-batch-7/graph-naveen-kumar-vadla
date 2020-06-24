const { getAdjacencyList } = require('./weighted_graphs_utils');

const makeParentsStructure = list => {
  const parents = {};
  for (const { vertex, edge } of list) {
    parents[vertex] = vertex;
    parents[edge] = edge;
  }
  return parents;
};

const getParent = (parents, node) => {
  const nodeParent = parents[node];
  if (node === nodeParent) return nodeParent;
  return getParent(parents, nodeParent);
};

const kruskalMST = (adjacencyList, isUndirected) => {
  const sortedEdges = adjacencyList.sort((a, b) => a.weight - b.weight);
  const mstEdges = [];
  const parents = makeParentsStructure(sortedEdges);
  for (const { vertex, edge, weight } of sortedEdges) {
    const vertexParent = getParent(parents, vertex);
    const edgeParent = getParent(parents, edge);
    if (vertexParent === edgeParent) continue;
    mstEdges.push([vertex, edge, weight]);
    parents[edgeParent] = vertexParent;
  }
  const newAdjacencyList = getAdjacencyList(mstEdges, isUndirected);
  const totalWeight = mstEdges.reduce((total, edge) => total + edge[2], 0);
  return { newAdjacencyList, totalWeight };
};

module.exports = { kruskalMST };
