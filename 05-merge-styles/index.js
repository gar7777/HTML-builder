const fs = require('fs');
const path = require('path');

let allData = '';

const takeTexts = async (pathToDir) => {
  fs.readdir(pathToDir, { withFileTypes: true }, (err, files) => {
    if (err) throw err;
    for (let file of files) {
      if (file.isDirectory()) return;
      if (path.parse(file.name).ext === '.css'){
        readStyleFile(file.name);
       }
    }
  })
}

const readStyleFile = (fileName) => {
  fs.readFile(path.join(__dirname, 'styles', fileName), 'utf-8', (err, data) => {
    if (err) throw err;
    appendBundle(data)
  })
}

const appendBundle = (data) => {
  fs.appendFile(path.join(__dirname, 'project-dist', 'bundle.css'), data, (err) => {
    if (err) throw err;
  });
}

takeTexts(path.join(__dirname, 'styles'));
