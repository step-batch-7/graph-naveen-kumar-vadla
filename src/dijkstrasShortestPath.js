const { getAdjacencyList, extractVertices } = require('./weighted_graphs_utils');

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

module.exports = { dijkstrasShortestPath };
