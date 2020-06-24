const { getAdjacencyList } = require('./weighted_graphs_utils');

const getAllConnectedEdges = (visited, adjacencyList) => {
  const allConnectedEdges = [];
  for (const node of visited) {
    const edges = adjacencyList[node] || [];
    allConnectedEdges.push(...edges);
  }
  return allConnectedEdges.filter(({ edge }) => !visited.has(edge));
};

const getMinimumEdge = (adjacencyList, visited) => {
  const allConnectedEdges = getAllConnectedEdges(visited, adjacencyList);
  const minEdge = allConnectedEdges.reduce(
    (minEdge, edge) => (edge.weight < minEdge.weight ? edge : minEdge),
    { weight: Infinity }
  );
  return minEdge;
};

const primsMST = (adjacencyList, allNodes, isDirected) => {
  const visited = new Set();
  const mstEdges = [];
  let currentEdge = allNodes[0];
  while (!allNodes.every(node => visited.has(node))) {
    visited.add(currentEdge);
    const { vertex, edge, weight } = getMinimumEdge(adjacencyList, visited);
    if (weight === Infinity) break;
    mstEdges.push([vertex, edge, weight]);
    currentEdge = edge;
  }
  const newAdjacencyList = getAdjacencyList(mstEdges, isDirected);
  const totalWeight = mstEdges.reduce((total, edge) => total + edge[2], 0);
  return { newAdjacencyList, totalWeight };
};

module.exports = { primsMST };
