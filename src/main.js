const fs = require('fs');
const { bfs, dfs, findPath } = require('./graph');
const { primsMST, kruskalMST } = require('./weighted_graphs');

const parseInputMakePairs = data => {
  const pairs = data.map(str => str.replace(/\|/g, '').trim().split('  '));
  return pairs.map(p => p.map(a => (Number(a) ? Number(a) : a)));
};

const main = () => {
  const data = fs.readFileSync('./src/data.txt', 'utf-8').trim().split('\n');
  const pairs = parseInputMakePairs(data);
  console.log(pairs);
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
    path.forEach((p, i) => process.stdout.write(`${p} -> `));
    console.log('\n');
  }
  let mst = primsMST(pairs, false);
  console.log('Prims MinimumSpanningTree\n', mst.newAdjacencyList);
  console.log('Prims Total Weight', mst.totalWeight);
  mst = kruskalMST(pairs, false);
  console.log('Kruskal MinimumSpanningTree\n', mst.newAdjacencyList);
  console.log('Kruskal Total Weight', mst.totalWeight);
};

main();
