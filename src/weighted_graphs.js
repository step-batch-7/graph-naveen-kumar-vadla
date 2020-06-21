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

const getAllConnectedEdges = (visited, adjacencyList) => {
  const allConnectedEdges = [];
  for (const node of visited) {
    allConnectedEdges.push(...adjacencyList[node]);
  }
  return allConnectedEdges.filter(edge => !visited.includes(edge.edge));
};

const getMinimumEdge = (adjacencyList, visited) => {
  const allConnectedEdges = getAllConnectedEdges(visited, adjacencyList);
  const minEdge = allConnectedEdges.reduce(
    (minEdge, edge) => (edge.weight < minEdge.weight ? edge : minEdge),
    { weight: Infinity }
  );
  return minEdge;
};

const primsMST = (pairs, isDirected) => {
  const adjacencyList = getAdjacencyList(pairs, isDirected);
  const allNodes = Object.keys(adjacencyList);
  const visited = [];
  const mstEdges = [];
  let currentEdge = allNodes[0];
  while (visited.length !== allNodes.length - 1) {
    visited.push(currentEdge);
    const minimumEdge = getMinimumEdge(adjacencyList, visited);
    mstEdges.push([minimumEdge.vertex, minimumEdge.edge, minimumEdge.weight]);
    currentEdge = minimumEdge.edge;
  }
  const newAdjacencyList = getAdjacencyList(mstEdges, isDirected);
  const totalWeight = mstEdges.reduce((total, edge) => total + edge[2], 0);
  return { newAdjacencyList, totalWeight };
};

module.exports = { primsMST };
