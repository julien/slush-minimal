'use strict';
var fs = require('fs')
  , cssmin = require('cssmin')
  , htmlmin = require('htmlmin')
  , files = []
  , infile
  , outfile
  , outstream
  , i 
  , l = process.argv.length - 1
  , done = 0
  , numfiles;

outfile = process.argv.pop();

function minify(file) {
  var pattern = /\.\w+$/
    , extension = pattern.exec(file)
    , task;

  if (!extension) return;

  task = extension[0] === '.css' ? cssmin : htmlmin;
  if (!task) return;

  fs.readFile(file, {encoding: 'utf-8'}, function (err, data) {
    if (!err && data) {
      
      outstream.write(task(data));
      done++;

      if (done === numfiles) {
        outstream.end();
      }
    }
  });
}

outstream = fs.createWriteStream(outfile, {flags: 'w', encoding: 'utf-8'});
outstream.on('close', function () {
  var str = numfiles > 1 ? 'files' : 'file'; 
  console.log('%s %s minified.', numfiles, str);
});

for (i = 2; i < l; i++) {
  files.push(process.argv[i]);
}
// console.log('file', files);
numfiles = files.length;

while (files.length) {
  minify(files.pop());
}


