const fs = require('fs');
const { stat } = require('fs')
const path = require('path');

fs.readdir(path.join(__dirname, 'secret-folder'), { withFileTypes: true }, (err, files) => {
  if (err)
    console.log(err);
  else {
    files.forEach(file => {
      if (file.isDirectory()) return;
      let fileName = '', fileExt = '', fileSize = '';
      fileName = path.parse(file.name).name;
      fileExt = (path.parse(file.name).ext).slice(1);
      stat(path.join(__dirname, 'secret-folder', file.name), (err, stats) => {
        fileSize = Math.ceil((stats.size / 1024)) + 'kb';
        console.log(fileName + ' - ' + fileExt + ' - ' + fileSize)
      })
      
    })
  }
})

