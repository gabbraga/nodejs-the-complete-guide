const http = require('http');
/* const fs = require('fs'); */

const server =  http.createServer((req, res) => {
    // console.log(req.url, req.method, req.headers);

    // parse the url
    const url = req.url;
    const method = req.method;
    if (url === '/') {
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
        /* fs.writeFileSync('message.txt', 'Dummy text'); */
        res.statusCode = 302; //indicates redirect
        res.setHeader('Location', '/');
        return res.end();
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