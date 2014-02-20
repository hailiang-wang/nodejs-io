var http = require('http');

var server = http.createServer(function (req,res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write('Hellor ');
    res.end('World');
})
server.listen(8000);
