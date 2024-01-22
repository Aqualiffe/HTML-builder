const fs = require('fs');
const path = require('path');

const pathStyles = path.join(__dirname, 'styles');

fs.readdir(pathStyles, {withFileTypes: true}, (err, files) => {
  if (err) throw err;
  files.forEach((file) => {
    const filePath = path.join(pathStyles, file.name)
    if (file.isFile() && path.extname(filePath) === '.css') {
      console.log(filePath);
    }
  });
});