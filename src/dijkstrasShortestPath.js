const {
  getMinWeighted,
  extractVertices,
  getNodesOf,
} = require('./weighted_graphs_utils');

const createTable = (allNodes, source) => {
  const table = {};
  for (const node of allNodes) {
    table[node] = { source: node, weight: Infinity, parent: undefined };
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
  return getMinWeighted(nodes);
};

const getPath = (table, node, source, path) => {
  if (node === source) return path;
  const parent = table[node].parent;
  path = parent + '->' + path;
  return getPath(table, parent, source, path);
};

const updateTableWithPaths = (table, source) => {
  let nodes = Object.values(table);
  const newTable = {};
  for (const node of nodes) {
    let path = getPath(table, node.source, source, '');
    path += node.source;
    newTable[node.source] = { weight: node.weight, path };
  }
  return newTable;
};

const dijkstrasShortestPath = (adjacencyList, source, target) => {
  const allNodes = extractVertices(adjacencyList);
  let table = createTable(allNodes, source);
  const processedNodes = new Set();
  let nextNode = source;
  while (allNodes.size) {
    let children = getNodesOf(adjacencyList, nextNode);
    children = children.filter(({ edge }) => !processedNodes.has(edge));
    const weightToParent = table[nextNode].weight;
    for (const { edge, weight } of children) {
      const weightToChild = weightToParent + weight;
      updateTable(table, edge, weightToChild, nextNode);
    }
    processedNodes.add(nextNode);
    allNodes.delete(nextNode);
    const minimumEdge = getMinimumOfTable(table, processedNodes);
    if (minimumEdge.weight === Infinity) continue;
    nextNode = minimumEdge.source;
  }
  table = updateTableWithPaths(table, source);
  return { table, path: table[target].path, weight: table[target].weight };
};

module.exports = { dijkstrasShortestPath };
