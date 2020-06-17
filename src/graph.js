//Example
// Pairs => [[from,to],[to,from]]
// Source => from
// To => to
// Should return true.
const makeGraph = (graph, [node, child]) => {
  graph[node] = graph[node] || [];
  graph[node].push(child);
  return graph;
};

const insertChildrenIntoQueue = (queue, visited, children) => {
  if (!children) return;
  for (const child of children) {
    !queue.includes(child) && !visited.includes(child) && queue.push(child);
  }
};

const bfs = (pairs, source, target) => {
  const graph = pairs.reduce(makeGraph, {});
  const visited = [];
  const queue = [];
  let result = false;
  insertChildrenIntoQueue(queue, visited, graph[source]);
  while (queue.length && !result) {
    const node = queue.shift();
    if (visited.includes(node)) continue;
    if (node == target) result = true;
    visited.push(node);
    insertChildrenIntoQueue(queue, visited, graph[node]);
  }
  return result;
};

const getConnectionPath = (graph, source, target, visited) => {
  visited.push(source);
  const children = graph[source] || [];
  if (children.includes(target)) return [source, target];
  let path = [];
  while (children.length && !path.length) {
    const node = children.shift();
    if (visited.includes(node)) continue;
    path = getConnectionPath(graph, node, target, visited);
    path = path.length ? [source, ...path] : [];
  }
  return path;
};

const dfs = (pairs, source, target) => {
  const graph = pairs.reduce(makeGraph, {});
  const visited = [];
  const path = getConnectionPath(graph, source, target, visited);
  return path.length != 0;
};

const findPath = (pairs, source, target) => {
  const graph = pairs.reduce(makeGraph, {});
  const visited = [];
  return getConnectionPath(graph, source, target, visited);
};

module.exports = { bfs, dfs, findPath };
