const fs = require('fs');
const { bfs, dfs, findPath } = require('./graph');
const { primsMST } = require('./weighted_graphs');

const parseInputMakePairs = data => {
  const pairs = data.map(str => str.replace(/\|/g, '').trim().split('  '));
  return pairs.map(p => p.map(a => (Number(a) ? Number(a) : a)));
};

const main = () => {
  const data = fs.readFileSync('./src/data.txt', 'utf-8').trim().split('\n');
  const pairs = parseInputMakePairs(data);
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
  const { newAdjacencyList, totalWeight } = primsMST(pairs, false);
  console.log('Prims MinimumSpanningTree\n', newAdjacencyList);
  console.log('Prims Total Weight', totalWeight);
};

main();
