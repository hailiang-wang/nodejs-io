var fs = require('fs')
var stat = require('fs').stat

stat('./read-file.js', function (err, s) {
    if (err) throw err;
    console.log(s)
    console.log("data ...")
    fs.readFile('./read-file.js', 'utf8', function(err, data) {
        if (err) throw err;
        console.log(data)
    });
});
