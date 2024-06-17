import * as http from "http";
import * as fs from "node:fs"
import {IncomingMessage, ServerResponse} from "node:http";


const viewsDirectory = "/views/content"
const hostname = '127.0.0.1';
const port = 3000;
const server = http.createServer((req:IncomingMessage, res:ServerResponse) => {
    let path =  req.url;
    res.setHeader('Content-Type', 'text/html'); //WHERE CAN I FIND THESE???
    if(path === "/" || path === "/home")
    {
        path = "/index.html";
        console.log(__dirname + viewsDirectory + path)
    }

    fs.readFile(__dirname + path, function (err, data)
    {
        if (err){
            res.writeHead(404);
            res.end("Error 404 - File Not Found " + err.message);
            console.log(__dirname + path);
            return;
        }
        res.writeHead(200);
        res.end(data)

    })

});
server.listen(port, hostname, () => {

    console.log(`Server running at http://${hostname}:${port}/`);
});
