const fs = require('fs');
const path = require('path');
const { copyFile } = require('fs/promises');

const clearFolder = async (pathToClearDir) => {
  let res = await fs.promises.rm(pathToClearDir, { recursive: true, force: true }, (err) => {
    if (err) throw err;
  });
  return res
}

const makeDir = (pathToDir) => {
  fs.mkdir(pathToDir, { recursive: true }, (err) => {
    if (err) throw err;
  });
}

const copyAllFiles = async (source, destination) => {
  fs.readdir(source, { withFileTypes: true }, (err, files) => {
    if (err) throw err;
    for (let file of files) {
      if (file.isDirectory()) {
        makeDir(path.join(destination, file.name));
        copyAllFiles(path.join(source, file.name), path.join(destination, file.name));
      } else {
        copyFile(path.join(source, file.name), path.join(destination, file.name));
      };
    }
  });
}

clearFolder(path.join(__dirname, 'files-copy'))
  .then(() => {
    makeDir(path.join(__dirname, 'files-copy'));
    copyAllFiles(path.join(__dirname, 'files'), path.join(__dirname, 'files-copy'))
  }).catch(err => {
    if (err) throw err;
  })







