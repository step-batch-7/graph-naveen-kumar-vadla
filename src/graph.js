//Example
// Pairs => [[from,to],[to,from]]
// Source => from
// To => to
// Should return true.
const makeGraph = (graph, [node, connectedTo]) => {
  graph[node] = graph[node] || [];
  graph[node].push(connectedTo);
  return graph;
};
const bfs = (pairs, source, target) => {
  const graph = pairs.reduce(makeGraph, {});
  const visited = [];
  const queue = [source];
  let result = false;
  while (queue.length && !result) {
    const node = queue.shift();
    if (node == target) result = true;
    if (visited.includes(node)) continue;
    visited.push(node);
    const children = graph[node];
    children.forEach(
      child =>
        !queue.includes(child) && !visited.includes(child) && queue.push(child)
    );
  }
  return result;
};

module.exports = { bfs };
