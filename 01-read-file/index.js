const fs = require('fs');
const path = require('path');

const rStream = fs.createReadStream(path.join(__dirname, 'text.txt'), 'utf-8');
let allText = '';
rStream.on('data', chunk => allText += chunk);
rStream.on('end', () => console.log(allText));


