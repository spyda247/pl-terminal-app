const fs = require('node:fs');

if (fs.existsSync('./report.txt')) {
  fs.unlink('./report.txt', (err) => {
    console.error(err);
  });
  console.log('\nDeleted file: report.txt');
}
