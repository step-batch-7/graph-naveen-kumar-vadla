const fs = require('fs');
const { bfs } = require('./graph');

const main = () => {
  const data = fs.readFileSync('./src/data.txt', 'utf-8').trim().split('\n');
  const pairs = data.map(str => str.replace(/\|/g, '').trim().split('  '));
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
    const result = bfs(pairs, source, target);
    console.log(source, '->', target, result ? '' : 'not', 'Found');
  }
};

main();
