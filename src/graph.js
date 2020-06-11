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

module.exports = { bfs };
