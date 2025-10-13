/**
 * Main entry point for Dictionary REST API server, makes the HTTP server, 
 * dictionary storage & request handling components. RESTful service for 
 * storing & retrieving eng word def.
 * 
 * @class App
*/

const http = require('http');
const Dictionary = require('./Dictionary');
const RequestHandler = require('./RequestHandler');
const LangUtil = require('./LangUtil');

class App {

    constructor(port) {

        this.port = port;
        this.dictionary = new Dictionary();
        this.langUtil = new LangUtil();
        this.handler = new RequestHandler(this.dictionary, this.langUtil);
        this.server = http.createServer((req, res) => this.handler.handle(req, res));
    }

    start() {

        this.server.listen(this.port, () => {

            console.log(this.langUtil.getString('console.serverRunning', { port: this.port }));
        });
    }
    
}


const port = process.env.PORT || 3000;
const app = new App(port);

app.start();
