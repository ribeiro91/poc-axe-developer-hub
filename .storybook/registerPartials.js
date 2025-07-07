const path = require('path');
const fs = require('fs');

let allPartials = [];

const fromDir = (startPath, filter, callback) => {
  if (!fs.existsSync(startPath)) {
    console.log('no dir ', startPath);
    return;
  }

  const files = fs.readdirSync(startPath);
  for (let i = 0; i < files.length; i++) {
    const filename = path.join(startPath, files[i]);
    const stat = fs.lstatSync(filename);
    if (stat.isDirectory()) {
      fromDir(filename, filter, callback); //recurse
    } else if (filter.test(filename)) {
      callback(filename);
    }
  }
};


fromDir('./src/components/', /\.html$/, function (filename) {
  if (filename.endsWith('partial.html')) {
    const formattedFileName = filename.replaceAll('\\', '/'); // windows fix
    const filePath = formattedFileName.split('src/components/')[1];
    const htmlString = fs.readFileSync(filename, 'utf8');
    allPartials.push({[filePath.split('.html')[0]] : htmlString });
  }
});

fs.writeFile(
  'partial-mapping.json',
  JSON.stringify({ allPartials }, null, 4),
  (err) => {
    if (err) {
      throw err;
    }
    console.log('partial-mapping.json file changed.');
  }
);