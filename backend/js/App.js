/**
 * Main entry point for Dictionary REST API server, makes the HTTP server,
 * dictionary storage & request handling components. Provide RESTful service for 
 * storing & retrieving English word def.
 * 
 * @class App
 */

const http = require('http');
const Dictionary = require('./Dictionary');
const RequestHandler = require('./RequestHandler');

class App {

    constructor(port) {

        this.port = port;
        this.dictionary = new Dictionary();
        this.handler = new RequestHandler(this.dictionary);
        this.server = http.createServer((req, res) => this.handler.handle(req, res));
    }

    start() {

        this.server.listen(this.port, () => {

            console.log(`Server running on port ${this.port}`);
        });
    }
}

// bootstrap
const app = new App(3000);

app.start();
