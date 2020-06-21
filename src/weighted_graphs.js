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
    const edges = adjacencyList[node] || [];
    allConnectedEdges.push(...edges);
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
    if (minimumEdge.weight === Infinity) continue;
    mstEdges.push([minimumEdge.vertex, minimumEdge.edge, minimumEdge.weight]);
    currentEdge = minimumEdge.edge;
  }
  const newAdjacencyList = getAdjacencyList(mstEdges, isDirected);
  const totalWeight = mstEdges.reduce((total, edge) => total + edge[2], 0);
  return { newAdjacencyList, totalWeight };
};

const kruskalMST = (pairs, isDirected) => {
  const adjacencyList = getAdjacencyList(pairs, isDirected);
  let allEdges = Object.values(adjacencyList);
  allEdges = allEdges.reduce((allEdges, edge) => allEdges.concat(edge), []);
  const sortedEdges = allEdges.sort((a, b) => a.weight - b.weight);
  const visited = [];
  const mstEdges = [];
  while (sortedEdges.length) {
    const edge = sortedEdges.shift();
    if (visited.includes(edge.vertex) && visited.includes(edge.edge)) continue;
    !visited.includes(edge.vertex) && visited.push(edge.vertex);
    !visited.includes(edge.edge) && visited.push(edge.edge);
    mstEdges.push([edge.vertex, edge.edge, edge.weight]);
  }
  const newAdjacencyList = getAdjacencyList(mstEdges, isDirected);
  const totalWeight = mstEdges.reduce((total, edge) => total + edge[2], 0);
  return { newAdjacencyList, totalWeight };
};

module.exports = { primsMST, kruskalMST };
