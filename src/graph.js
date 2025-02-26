//Example
// Pairs => [[from,to],[to,from]]
// Source => from
// To => to
// Should return true.
const makeAdjacencyList = (adjacencyList, [node, child], isDirected) => {
  adjacencyList[node] = adjacencyList[node] || [];
  adjacencyList[node].push(child);
  if (isDirected) return adjacencyList;
  adjacencyList[child] = adjacencyList[child] || [];
  adjacencyList[child].push(node);
  return adjacencyList;
};

const getAdjacencyList = (pairs, isDirected) => {
  let adjacencyList = {};
  for (const pair of pairs) {
    adjacencyList = makeAdjacencyList(adjacencyList, pair, isDirected);
  }
  return adjacencyList;
};

const insertChildrenIntoQueue = (queue, visited, children) => {
  if (!children) return;
  for (const child of children) {
    !queue.includes(child) && !visited.includes(child) && queue.push(child);
  }
};

const bfs = (pairs, source, target) => {
  const adjacencyList = getAdjacencyList(pairs, true);
  const visited = [];
  const queue = [];
  let result = false;
  insertChildrenIntoQueue(queue, visited, adjacencyList[source]);
  while (queue.length && !result) {
    const node = queue.shift();
    if (visited.includes(node)) continue;
    if (node == target) result = true;
    visited.push(node);
    insertChildrenIntoQueue(queue, visited, adjacencyList[node]);
  }
  return result;
};

const getConnectionPath = (adjacencyList, source, target, visited) => {
  visited.push(source);
  const children = adjacencyList[source] || [];
  if (children.includes(target)) return [source, target];
  let path = [];
  while (children.length && !path.length) {
    const node = children.shift();
    if (visited.includes(node)) continue;
    path = getConnectionPath(adjacencyList, node, target, visited);
    path = path.length ? [source, ...path] : [];
  }
  return path;
};

const findPath = (pairs, source, target) => {
  const adjacencyList = getAdjacencyList(pairs, true);
  const visited = [];
  return getConnectionPath(adjacencyList, source, target, visited);
};

// The findPath uses the dfs mechanism to find the path so using findPath in dfs

const dfs = (pairs, source, target) => {
  const path = findPath(pairs, source, target);
  return path.length != 0;
};

module.exports = { bfs, dfs, findPath };
