const fs = require('fs');
const readline = require('readline');

const filePath = './02-write-file/text.txt';
const writeStream = fs.createWriteStream(filePath, { flags: 'a' });

console.log('write your input or exit:');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', (input) => {
  if (input.toLowerCase() === 'exit') {
    handleExit();
  } else {
    writeStream.write(input + '\n');
    rl.prompt();
    }
});
rl.prompt();

process.on('SIGINT', () => {
  handleExit();
});

function handleExit() {
  console.log('the process is terminated');
  rl.close();
  writeStream.close();
  process.exit();
}