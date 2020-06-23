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

const extractVertices = pairs => {
  const vertices = new Set();
  for (const pair of pairs) {
    vertices.add(pair[0]);
    vertices.add(pair[1]);
  }
  return Array.from(vertices);
};

const primsMST = (pairs, isDirected) => {
  const adjacencyList = getAdjacencyList(pairs, isDirected);
  const allNodes = extractVertices(pairs);
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

const kruskalMST = (pairs, isDirected) => {
  const adjacencyList = getAdjacencyList(pairs, isDirected);
  let allEdges = Object.values(adjacencyList);
  allEdges = allEdges.reduce((allEdges, edge) => allEdges.concat(edge), []);
  const sortedEdges = allEdges.sort((a, b) => a.weight - b.weight);
  const mstEdges = [];
  const parents = makeParentsStructure(sortedEdges);
  for (const { vertex, edge, weight } of sortedEdges) {
    const vertexParent = getParent(parents, vertex);
    const edgeParent = getParent(parents, edge);
    if (vertexParent === edgeParent) continue;
    mstEdges.push([vertex, edge, weight]);
    parents[edgeParent] = vertexParent;
  }
  const newAdjacencyList = getAdjacencyList(mstEdges, isDirected);
  const totalWeight = mstEdges.reduce((total, edge) => total + edge[2], 0);
  return { newAdjacencyList, totalWeight };
};

const createTable = (allEdges, source) => {
  const table = {};
  for (const edge of allEdges) {
    table[edge] = { source: edge, weight: Infinity, parent: undefined };
  }
  table[source].weight = 0;
  return table;
};

const updateTable = (table, node, weight, parent) => {
  table[node] = table[node] || {};
  const existingWeight = table[node].weight;
  const existingParent = table[node].parent;
  table[node].weight = existingWeight <= weight ? existingWeight : weight;
  table[node].parent = existingWeight <= weight ? existingParent : parent;
};

const getMinimumOfTable = (table, processedNodes) => {
  let nodes = Object.values(table);
  nodes = nodes.filter(edge => !processedNodes.has(edge.source));
  return nodes.reduce((min, node) => (node.weight < min.weight ? node : min), {
    weight: Infinity,
  });
};

const getPath = (table, node, source, path) => {
  if (node === source) return path;
  const parent = table[node].parent;
  path.unshift(parent);
  return getPath(table, parent, source, path);
};

const modifyTableWithPaths = (table, source) => {
  let nodes = Object.values(table);
  const newTable = {};
  for (const node of nodes) {
    let path = getPath(table, node.source, source, []);
    path = path.reduce((p, n) => p + n + '->', '');
    path += node.source;
    newTable[node.source] = { weight: node.weight, path };
  }
  return newTable;
};

const dijkstrasShortestPath = (pairs, isDirected, source, target) => {
  const adjacencyList = getAdjacencyList(pairs, isDirected);
  let allEdges = extractVertices(pairs);
  let table = createTable(allEdges, source);
  const processedNodes = new Set();
  let nextNode = source;
  while (!allEdges.every(edge => processedNodes.has(edge))) {
    let children = adjacencyList[nextNode] || [];
    children = children.filter(({ edge }) => !processedNodes.has(edge));
    const weightToParent = table[nextNode].weight;
    for (const { edge, weight } of children) {
      const weightToChild = weightToParent + weight;
      updateTable(table, edge, weightToChild, nextNode);
    }
    processedNodes.add(nextNode);
    const minimumEdge = getMinimumOfTable(table, processedNodes);
    if (minimumEdge.weight === Infinity) continue;
    nextNode = minimumEdge.source;
  }
  table = modifyTableWithPaths(table, source);
  return { table, path: table[target].path, weight: table[target].weight };
};

module.exports = { primsMST, kruskalMST, dijkstrasShortestPath };
