const fs = require('fs');
const { bfs } = require('./graph');

const getMessage = (result, source, target) =>
  `Path is ${result ? '' : 'not'} Present Between ${source} and ${target}`;

const main = () => {
  const data = fs.readFileSync('./src/data.txt', 'utf-8').trim().split('\n');
  const pairs = data.map(str => str.replace(/\|/g, '').trim().split('  '));
  let result;

  result = bfs(pairs, 'bb', 'jj');
  console.log(getMessage(result, 'bb', 'jj'));

  result = bfs(pairs, 'jj', 'aa');
  console.log(getMessage(result, 'jj', 'aa'));

  result = bfs(pairs, 'aa', 'hh');
  console.log(getMessage(result, 'aa', 'hh'));

  result = bfs(pairs, 'hh', 'ii');
  console.log(getMessage(result, 'hh', 'ii'));

  result = bfs(pairs, 'ii', 'ee');
  console.log(getMessage(result, 'ii', 'ee'));

  result = bfs(pairs, 'ee', 'mm');
  console.log(getMessage(result, 'ee', 'mm'));

  result = bfs(pairs, 'mm', 'jj');
  console.log(getMessage(result, 'mm', 'jj'));
};

main();
