const fs = require('fs');
const path = require('path');

const pathStyles = path.join(__dirname, 'styles');
const pathOutput = path.join(__dirname, 'project-dist', 'bundle.css');
const writeStream = fs.createWriteStream(pathOutput, 'utf-8');

console.log('Файл создан');

fs.readdir(pathStyles, {withFileTypes: true}, (err, files) => {
  if (err) throw err;
  files.forEach((file) => {
    const filePath = path.join(pathStyles, file.name);
    const readStream = fs.createReadStream(filePath, 'utf-8');
    if (file.isFile() && path.extname(filePath) === '.css') {
      readStream.pipe(writeStream);
    }
  });
});