const fs = require('fs');
const { bfs, dfs, findPath } = require('./graph');

const main = () => {
  const data = fs.readFileSync('./src/data.txt', 'utf-8').trim().split('\n');
  let pairs = data.map(str => str.replace(/\|/g, '').trim().split('  '));
  pairs = pairs.map(p => p.map(a => (Number(a) ? Number(a) : a)));
  const questions = [
    ['bb', 'jj'],
    ['jj', 'aa'],
    ['aa', 'hh'],
    ['hh', 'ii'],
    ['ii', 'ee'],
    ['ee', 'mm'],
    ['mm', 'jj'],
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
};

main();
