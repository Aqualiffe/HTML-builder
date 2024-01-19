const fs = require('fs');
const path = require('path');

const readerStream = fs.createReadStream(path.join(__dirname, 'text.txt'));
readerStream.setEncoding('utf-8');

readerStream.on('data', function(data) {
    console.log(data);
});