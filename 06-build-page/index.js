const fs = require('fs');
const path = require('path');

const pathStyles = path.join(__dirname, 'styles');
const pathAssets = path.join(__dirname, 'assets');
const pathComponents = path.join(__dirname, 'components');
const pathFolder = path.join(__dirname, 'project-dist');
const pathNewCss = path.join(__dirname, 'project-dist', 'style.css');
const pathNewHtml = path.join(__dirname, 'project-dist', 'index.html');
const pathCopyAssets = path.join(__dirname, 'project-dist', 'assets');
const pathTemplate = path.join(__dirname, 'template.html');

fs.mkdir(pathFolder, { recursive: true }, err => {
  if (err) throw err;
});

const writeStream = fs.createWriteStream(pathNewCss, 'utf-8');
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

async function copyDir(newPath = pathCopyAssets, fromPath = pathAssets) {
  await fs.promises.rm(newPath, { recursive: true, force: true });
  fs.mkdir(newPath, { recursive: true }, err => {
    if (err) throw err;
  });

  fs.readdir(fromPath, { withFileTypes: true }, (err, files) => {
    if (err) throw err;
    files.forEach(file => {
      if (file.isDirectory()) {
        console.log('folder: ' + (path.join(newPath, file.name)));
        copyDir(path.join(newPath, file.name), path.join(fromPath, file.name));
      }
      if (file.isFile()) {
        const pathFile = path.join(fromPath, file.name);
        const newPathFile = path.join(newPath, file.name);
        fs.copyFile(pathFile, newPathFile, err => {
          if (err) throw err;
          console.log('New file: ' + file.name);
        })
      };
    });
  });
}
copyDir();


