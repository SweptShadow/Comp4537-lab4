/**
 * HTTP request handler for Dictionary REST API, processes GET requests for word lookups & POST requests for adding new def.
 * Manage request counting, error handling & JSON response formatting w/ CORS support.
 * 
 * ChatGPT used to fix errors within this file.
 * 
 * @class RequestHandler
 */

const url = require('url');

class RequestHandler {

    constructor(dictionary, langUtil) {

        this.dictionary = dictionary;
        this.langUtil = langUtil;
        this.requestCount = 0;
    }

    handle(req, res) {

        this.requestCount++;

        const parsedUrl = url.parse(req.url, true);

        // Handle CORS preflight requests
        if (req.method === 'OPTIONS') {
            res.writeHead(200, {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            });
            return res.end();
        }

        if (req.method === 'GET' && parsedUrl.pathname === '/api/definitions') {

            const word = parsedUrl.query.word;
            const entry = this.dictionary.find(word);

            res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });

            if (entry) {

                res.end(JSON.stringify({ requestCount: this.requestCount, entry }));
            } else {

                res.end(JSON.stringify({
                    requestCount: this.requestCount,
                    message: this.langUtil.getString('errors.wordNotFound', { word })
                }));
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

                        res.writeHead(400, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });

                        return res.end(JSON.stringify({ message: this.langUtil.getString('errors.invalidInput') }));
                    }

                    const result = this.dictionary.add(word, definition);

                    if (result.exists) {

                        res.writeHead(409, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
                        res.end(JSON.stringify({

                            message: this.langUtil.getString('success.warningExists', { word }),
                            requestCount: this.requestCount
                        }));
                    } else {

                        res.writeHead(201, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
                        res.end(JSON.stringify({

                            message: this.langUtil.getString('success.newEntryRecorded'),
                            requestCount: this.requestCount,
                            totalEntries: result.total
                        }));
                    }
                } catch {

                    res.writeHead(400, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
                    res.end(JSON.stringify({ message: this.langUtil.getString('errors.badJson') }));
                }
            });
        }

        else {

            res.writeHead(404, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
            res.end(JSON.stringify({ message: this.langUtil.getString('errors.notFound') }));
        }
    }
}

module.exports = RequestHandler;
