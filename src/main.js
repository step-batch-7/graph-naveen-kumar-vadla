const fs = require('fs');
const { bfs, dfs, findPath } = require('./graph');
const { dijkstrasShortestPath } = require('./dijkstrasShortestPath');
const { primsMST } = require('./primsMST');
const { kruskalMST } = require('./KruskalMST');
const { getAdjacencyList } = require('./weighted_graphs_utils');

const parseInputMakePairs = data => {
  const pairs = data.map(str => str.replace(/\|/g, '').trim().split('  '));
  return pairs.map(p => p.map(a => (Number(a) ? Number(a) : a)));
};

const main = () => {
  const data = fs.readFileSync('./src/data.txt', 'utf-8').trim().split('\n');
  const pairs = parseInputMakePairs(data);
  const adjacencyList = getAdjacencyList(pairs, true);
  const questions = [
    ['A', 'M'],
    ['A', 'J'],
  ];
  for (const [source, target] of questions) {
    let result = bfs(pairs, source, target);
    console.log('BFS', source, '->', target, result ? '' : 'not', 'Found');

    result = dfs(pairs, source, target);
    console.log('DFS', source, '->', target, result ? '' : 'not', 'Found');

    const path = findPath(pairs, source, target);
    process.stdout.write(`path : `);
    path.forEach(p => process.stdout.write(`${p} -> `));
    console.log('\n');
  }
  let mst = primsMST(adjacencyList, true);
  console.log('Prims MinimumSpanningTree\n', mst.newAdjacencyList);
  console.log('Prims Total Weight', mst.totalWeight);

  mst = kruskalMST(adjacencyList, true);
  console.log('\nKruskal MinimumSpanningTree\n', mst.newAdjacencyList);
  console.log('Kruskal Total Weight', mst.totalWeight);

  const result = dijkstrasShortestPath(adjacencyList, 'A', 'J');
  const { table, path, weight } = result;
  console.table("\nDijkstra's Minimum Path to all nodes from A");
  console.table(table);
  console.log("Dijkstra's Shortest Path from A to J", path);
  console.log("Dijkstra's Shortest weight from A to J", weight);
};

main();
