const fs = require('fs');
const path = require('path');
const pathFolder = path.join(__dirname, 'files');
const pathCopyFolder = path.join(__dirname, 'files-copy');

function copyDir() {
  fs.mkdir(path.join(__dirname, 'files-copy'), { recursive: true }, err => {
      if (err) throw err;
  });
  fs.readdir(pathCopyFolder, function(err, files) {
    if (err) throw err;
    files.forEach(file => {
      const oldPathFile = path.join(pathCopyFolder, file);
      console.log('старые файлы: ' + oldPathFile);
      fs.unlink(oldPathFile, (err) => {
        if (err) throw err;
      });
    });
  });

  fs.readdir(pathFolder, { withFileTypes: true }, (err, files) => {
    if (err) throw err;
    files.forEach(file => {
      if (file.isFile()) {
        const pathFile = path.join(pathFolder, file.name);
        const newPathFile = path.join(pathCopyFolder, file.name)
        fs.copyFile(pathFile, newPathFile, err => {
          if (err) throw err;
          console.log('Новые файлы: ' + newPathFile);
        })
      }
    });
  });
}

copyDir();