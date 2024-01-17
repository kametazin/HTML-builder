const fs = require('fs');
const filePath = '01-read-file/text.txt';
const readStream = fs.createReadStream(filePath, 'utf8');

readStream.on('data', (data) => {
  console.log('Content:', data);
});

readStream.on('end', () => {
  console.log('Reading finished');
});

readStream.on('error', (err) => {
  console.error('Error:', err);
});