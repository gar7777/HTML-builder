const fs = require('fs');
const { stdin } = process;
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface(stdin);
const wStream = fs.createWriteStream(path.join(__dirname, 'result.txt'));

console.log('Please, enter your text');
process.on('SIGINT', () => {
  exitHandler();
});

rl.on('line', (data) => {
  if (data === 'exit') {
    exitHandler();
  }
  wStream.write(data + '\n');
});

function exitHandler() {
  console.log('\nGood luck!');
  process.exit();
}
