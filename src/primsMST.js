const {
  getAdjacencyList,
  getMinWeighted,
  getNodesOf,
  extractVertices,
} = require('./weighted_graphs_utils');

const getConnectedEdges = (visited, adjacencyList) => {
  let connectedEdges = [];
  for (const node of visited) {
    const edges = getNodesOf(adjacencyList, node);
    connectedEdges = connectedEdges.concat(edges);
  }
  return connectedEdges.filter(({ edge }) => !visited.has(edge));
};

const primsMST = (adjacencyList, isUndirected) => {
  const allNodes = extractVertices(adjacencyList);
  const visited = new Set();
  const mstEdges = [];
  let currentEdge = allNodes[0];
  while (allNodes.size) {
    visited.add(currentEdge);
    allNodes.delete(currentEdge);
    const connectedEdges = getConnectedEdges(visited, adjacencyList);
    const { vertex, edge, weight } = getMinWeighted(connectedEdges);
    if (weight === Infinity) break;
    mstEdges.push([vertex, edge, weight]);
    currentEdge = edge;
  }
  const newAdjacencyList = getAdjacencyList(mstEdges, isUndirected);
  const totalWeight = mstEdges.reduce((total, edge) => total + edge[2], 0);
  return { newAdjacencyList, totalWeight };
};

module.exports = { primsMST };
