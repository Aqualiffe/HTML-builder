const { error } = require('console');
const fs = require('fs');
const path = require('path');

const pathFolder = path.join(__dirname, 'secret-folder');
fs.readdir(pathFolder, {withFileTypes: true}, function(err, items) {
  if (err) console.error(err);
    items.forEach((item) => {
      if(item.isFile()){
        const itemPath = path.join(pathFolder, item.name);
        const extension = path.extname(itemPath).slice(1);
        const nameWithDot = path.basename(itemPath);
        const dot = nameWithDot.indexOf('.');
        const name = nameWithDot.slice(0, dot)
        fs.stat(itemPath, (error, stats) => {
          if (error) console.error(error);
          const size = (stats.size / 1024).toFixed(3);
          console.log(`${name} - ${extension} - ${size}kb`);
        })
    }
  })
});
