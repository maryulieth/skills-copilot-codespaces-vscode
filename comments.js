// Create web server
var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');

// Create server
http.createServer(function(req, res) {
    var pathname = url.parse(req.url).pathname;

    if (pathname === '/') {
        fs.readFile('index.html', function(err, data) {
            res.writeHead(200, {
                'Content-Type': 'text/html'
            });
            res.write(data);
            return res.end();
        });
    } else if (pathname === '/comments') {
        if (req.method === 'POST') {
            var body = '';

            req.on('data', function(data) {
                body += data;
            });

            req.on('end', function() {
                var post = qs.parse(body);
                console.log(post);
                res.writeHead(302, {
                    'Location': '/'
                });
                res.end();
            });
        } else {
            res.writeHead(404, {
                'Content-Type': 'text/html'
            });
            res.write('404 Not Found\n');
            return res.end();
        }
    } else {
        res.writeHead(404, {
            'Content-Type': 'text/html'
        });
        res.write('404 Not Found\n');
        return res.end();
    }
}).listen(8080);
console.log('Server running at http://localhost:8080/');