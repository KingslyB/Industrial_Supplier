import * as http from "http";
import * as fs from "node:fs"
import {IncomingMessage, ServerResponse} from "node:http";
import express from 'express';
import path from 'path'
const app = express();
app.set('views', path.join(__dirname, './views'))
app.set('view engine', 'ejs');

//const viewsDirectory = "/views/content";
const indexPath = "/index.html";
const hostname = '127.0.0.1';
const port = 3000;

app.use('/', function(req,res, next){
    console.log("that's all");
    res.send("TEST");
})
app.use('/', function(req,res){
})


app.listen(port, function(){
    console.log("Testing Testing Testing")
})

function testfunction(stringA: string, callback: Function): void{

}


//
// const server = http.createServer((req:IncomingMessage, res:ServerResponse) => {
//     const originalPath  =  req.url;
//     let pathToBeRead = originalPath;
//
//
//
//
//     if(typeof originalPath === "string" && originalPath.indexOf(".css") > -1){
//         res.setHeader('Content-Type', 'text/css');
//     } else {
//         res.setHeader('Content-Type', 'text/html');
//     }
//
//     if (!originalPath?.includes(".") || originalPath === "/" || originalPath === "/home"){
//         pathToBeRead = indexPath;
//     }
//
//
//     fs.readFile(__dirname + pathToBeRead, function (err, data)
//     {
//         if (err){
//             res.writeHead(404);
//             res.end("Error 404 - File Not Found " + err.message);
//             console.log(__dirname + originalPath);
//             return;
//         }
//         console.log(__dirname + originalPath);
//         res.writeHead(200);
//         res.end(data)
//
//     })
// });
//
//
// server.listen(port, hostname, () => {
//
//     console.log(`Server running at http://${hostname}:${port}/`);
// });
