const http = require('http');
const fs = require('fs');

const server =  http.createServer((req, res) => {
    // console.log(req.url, req.method, req.headers);

    // parse the url
    const url = req.url;
    const method = req.method;
    if (url === '/') {
        res.setHeader('Content-Type', 'text/html');
        res.write(`
        <html>
            <head><title>Enter Message</title></head>
            <body>
                <form action="/message" method="POST">
                    <input type="text" name="someData">
                    <button type="submit">Send</button>
                </form>
            </body>
        </html>`);
    return res.end();
    }

    if(url === '/message' && method === 'POST') {
        const body = [];
        // the data event will be fired when a chunk of data is ready to be read from the request
        req.on('data', (chunk) => {
            console.log(chunk);
            body.push(chunk);
        });
        // the end event will be fired once the incoming request is done being parsed
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            console.log(parsedBody);
            const message = parsedBody.split('=')[1];
            fs.writeFile('message.txt', message, (err) => {
                // don't send the response until we're done writing to the file
                res.statusCode = 302; //indicates redirect
                res.setHeader('Location', '/');
                res.end();
            });
        });
    }

    res.setHeader('Content-Type', 'text/html');
    res.write(`
    <html>
        <head><title>hey</title></head>
        <body><h1>hey</h1></body>
    </html>`);
    res.end(); 
});

server.listen(3000);