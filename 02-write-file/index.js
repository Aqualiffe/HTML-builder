const fs = require('fs');
const path = require('path');
const {stdin, stdout} = process;

const writeStream = fs.createWriteStream(path.join(__dirname, '02-write-file.txt'));
stdout.write('Enter text\n');
stdin.on('data', function(data) {
    if(data.toString().includes('exit')) {
        process.exit();
    }
    writeStream.write(data);
})
process.on('SIGINT', () => process.exit());
process.on('exit', () => stdout.write('Goodbye'));