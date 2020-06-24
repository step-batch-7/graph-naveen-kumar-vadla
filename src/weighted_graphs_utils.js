const makeAdjacencyList = (adjacencyList, pair, isDirected) => {
  const [node, child, weight] = pair;
  adjacencyList[node] = adjacencyList[node] || [];
  adjacencyList[node].push({ vertex: node, edge: child, weight });
  if (isDirected) return adjacencyList;
  adjacencyList[child] = adjacencyList[child] || [];
  adjacencyList[child].push({ vertex: child, edge: node, weight });
  return adjacencyList;
};

const getAdjacencyList = (pairs, isDirected) => {
  let adjacencyList = {};
  for (const pair of pairs) {
    adjacencyList = makeAdjacencyList(adjacencyList, pair, isDirected);
  }
  return adjacencyList;
};

const extractVertices = pairs => {
  const vertices = new Set();
  for (const pair of pairs) {
    vertices.add(pair[0]);
    vertices.add(pair[1]);
  }
  return Array.from(vertices);
};

const getMinWeighted = edges => {
  let minWeighted = { weight: Infinity };
  for (const edge of edges) {
    minWeighted = edge.weight < minWeighted.weight ? edge : minWeighted;
  }
  return minWeighted;
};

module.exports = { getAdjacencyList, extractVertices, getMinWeighted };
