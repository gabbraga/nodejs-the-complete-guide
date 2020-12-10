const http = require('http');

const server =  http.createServer((req, res) => {
    console.log(req.url, req.method, req.headers);
    res.setHeader('Content-Type', 'text/html');
    res.write(`
    <html>
        <head><title>hey</title></head>
        <body><h1>hey</h1></body>
    </html>`);
    res.end();
});

server.listen(3000);