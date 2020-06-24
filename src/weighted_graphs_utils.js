const makeAdjacencyList = (adjacencyList, pair, isUndirected) => {
  const [node, child, weight] = pair;
  adjacencyList.push({ vertex: node, edge: child, weight });
  isUndirected && adjacencyList.push({ vertex: child, edge: node, weight });
  return adjacencyList;
};

const getAdjacencyList = (pairs, isUndirected) => {
  let adjacencyList = [];
  pairs.forEach(pair => makeAdjacencyList(adjacencyList, pair, isUndirected));
  return adjacencyList;
};

const extractVertices = pairs => {
  const vertices = new Set();
  pairs.forEach(({ vertex, edge }) => vertices.add(vertex, edge));
  return Array.from(vertices);
};

const getMinWeighted = edges => {
  let minWeighted = { weight: Infinity };
  for (const edge of edges) {
    minWeighted = edge.weight < minWeighted.weight ? edge : minWeighted;
  }
  return minWeighted;
};

const getNodesOf = (adjacencyList, node) => {
  return adjacencyList.filter(edge => edge.vertex === node);
};

module.exports = {
  getAdjacencyList,
  extractVertices,
  getMinWeighted,
  getNodesOf,
};
