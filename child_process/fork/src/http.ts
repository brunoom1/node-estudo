import http, { RequestListener } from "http";

const hostname = '127.0.0.1';
const port = 3000;


const requestListener: RequestListener = async (req, res) => {
    
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end("Página HTML");

};

const server = http.createServer(requestListener);
server.on('close', () => console.log("Close server"));
server.on('listening', () => console.log("Init server"));
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`);
});
