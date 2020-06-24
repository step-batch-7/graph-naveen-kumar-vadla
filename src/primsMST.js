const { getAdjacencyList, getMinWeighted } = require('./weighted_graphs_utils');

const getConnectedEdges = (visited, adjacencyList) => {
  const connectedEdges = [];
  for (const node of visited) {
    const edges = adjacencyList[node] || [];
    connectedEdges.push(...edges);
  }
  return connectedEdges.filter(({ edge }) => !visited.has(edge));
};

const primsMST = (adjacencyList, allNodes, isDirected) => {
  const visited = new Set();
  const mstEdges = [];
  let currentEdge = allNodes[0];
  while (!allNodes.every(node => visited.has(node))) {
    visited.add(currentEdge);
    const connectedEdges = getConnectedEdges(visited, adjacencyList);
    const { vertex, edge, weight } = getMinWeighted(connectedEdges);
    if (weight === Infinity) break;
    mstEdges.push([vertex, edge, weight]);
    currentEdge = edge;
  }
  const newAdjacencyList = getAdjacencyList(mstEdges, isDirected);
  const totalWeight = mstEdges.reduce((total, edge) => total + edge[2], 0);
  return { newAdjacencyList, totalWeight };
};

module.exports = { primsMST };
