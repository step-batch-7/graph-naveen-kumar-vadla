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
  return true;
};

module.exports = { bfs };
