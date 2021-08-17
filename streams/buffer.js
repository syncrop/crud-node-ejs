const fs = require("fs");
const http = require("http");

const server = http.createServer();

server.on('request', (req, res) => {
    const readStream = fs.createReadStream('data.txt');

    readStream.on('data', (chunk) => {
        res.write(chunk);
    });
    readStream.on('end', () => res.end());
    readStream.on('error', err => {
        // Send an error message to the client
        console.error(err);
        res.end("file not found");
        // res.status(500).send({ status: 'error', err });
    });
})

server.listen(8000, "127.0.0.1");