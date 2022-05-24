const fs = require('fs');
const path = require('path');
const { copyFile } = require('fs/promises');

const clearFolder = async (pathToClearDir) => {
  try {
    await fs.promises.rm(pathToClearDir, { recursive: true, force: true });
  } catch (err) {
    throw err
  } 
}

const handleHTMLFile = async (pathToFile) => {
  try {
    let data = await fs.promises.readFile(pathToFile, 'utf8');
    const componentFiles = await fs.promises.readdir(path.join(__dirname, 'components'));
    for (let file of componentFiles) {
      const text = await fs.promises.readFile(path.join(__dirname, 'components', file), 'utf-8');
      const fileName = path.parse(path.join(__dirname, 'components', file)).name;
      if (path.parse(path.join(__dirname, 'components', file)).ext === '.html') {
        data = data.replace(`\{\{${fileName}\}\}`, text);
      }
    }
    fs.mkdir(path.join(__dirname, 'project-dist'), (err) => {
      if (err) return;
    });
    fs.writeFile(path.join(__dirname, 'project-dist', 'index.html'), data, (err) => {
      if (err) throw err;
    });
    createBundle(path.join(__dirname, 'styles'));
    makeDir(path.join(__dirname, 'project-dist', 'assets'));
    copyAllFiles(path.join(__dirname, 'assets'), path.join(__dirname, 'project-dist', 'assets'));
  } catch (err) {
    throw err;
  }
}

const createBundle = (pathToDir) => {
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
  fs.appendFile(path.join(__dirname, 'project-dist', 'style.css'), data, (err) => {
    if (err) throw err;
  });
}

const makeDir = (pathToDir) => {
  fs.mkdir(pathToDir, { recursive: true }, (err) => {
    if (err) return;
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

clearFolder(path.join(__dirname, 'project-dist'))
  .then(() => {
    handleHTMLFile(path.join(__dirname, 'template.html'))
})
  .catch(err => {
    if (err) throw err;
  })
