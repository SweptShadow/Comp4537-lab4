/**
 * HTTP request handler for Dictionary REST API, processes GET requests for word lookups & POST requests for adding new def.
 * Manages request counting, error handling & JSON response formatting w/ CORS support.
 * 
 * @class RequestHandler
 */

const url = require('url');

class RequestHandler {

    constructor(dictionary) {

        this.dictionary = dictionary;
        this.requestCount = 0;
    }

    handle(req, res) {

        this.requestCount++;

        const parsedUrl = url.parse(req.url, true);

        if (req.method === 'GET' && parsedUrl.pathname === '/api/definitions') {

            const word = parsedUrl.query.word;
            const entry = this.dictionary.find(word);

            res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });

            if (entry) {

                res.end(JSON.stringify({ requestCount: this.requestCount, entry }));
            } else {

                res.end(JSON.stringify({ requestCount: this.requestCount, message: `Word '${word}' not found` }));
            }
        }

        else if (req.method === 'POST' && parsedUrl.pathname === '/api/definitions') {

            let body = '';

            req.on('data', chunk => body += chunk);
            req.on('end', () => {

                try {

                    const data = JSON.parse(body);
                    const { word, definition } = data;

                    if (!word || !definition) {

                        res.writeHead(400, { 'Content-Type': 'application/json' });

                        return res.end(JSON.stringify({ message: 'Invalid input' }));
                    }

                    const result = this.dictionary.add(word, definition);

                    if (result.exists) {

                        res.writeHead(409, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ message: `Warning! '${word}' already exists`, requestCount: this.requestCount }));
                    } else {

                        res.writeHead(201, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ message: 'New entry recorded', requestCount: this.requestCount, totalEntries: result.total }));
                    }
                } catch {

                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: 'Bad JSON' }));
                }
            });
        }

        else {

            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Not Found' }));
        }
    }
}

module.exports = RequestHandler;
