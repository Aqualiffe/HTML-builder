const fs = require('fs');
const path = require('path');

async function copyDir() {
  fs.mkdir(path.join(__dirname, 'files-copy'),
    (err) => {
      if (err) {
        return console.error(err);
    }
    }
  );
}

copyDir();