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

const dfs = (pairs, source, target, visited = []) => {
  visited.push(source);
  const graph = pairs.reduce(makeGraph, {});
  const children = graph[source] || [];
  if (children.includes(target)) return true;
  let result = false;
  while (children.length && !result) {
    const node = children.shift();
    if (visited.includes(node)) continue;
    result = dfs(pairs, node, target, visited) ? true : false;
  }
  return result;
};

const findPath = (pairs, source, target, visited = []) => {
  visited.push(source);
  const graph = pairs.reduce(makeGraph, {});
  const children = graph[source] || [];
  if (children.includes(target)) return [source, target];
  let path = [];
  while (children.length && !path.length) {
    const node = children.shift();
    if (visited.includes(node)) continue;
    path = findPath(pairs, node, target, visited);
    path = path.length ? [source, ...path] : [];
  }
  return path;
};

module.exports = { bfs, dfs, findPath };
