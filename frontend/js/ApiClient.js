/**
 * API client for communicating w/ Dictionary REST service, provides methods for adding new definitions 
 * via POST & retrieving definitions via GET.Handles HTTP requests using fetch API.
 * 
 * @class ApiClient
 */

class ApiClient {

    constructor(baseUrl) {

        this.baseUrl = baseUrl;
    }

    async addDefinition(word, definition) {

        const response = await fetch(`${this.baseUrl}/api/definitions`, {

            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ word, definition })

        });

        return response.json();
    }

    async getDefinition(word) {

        const response = await fetch(`${this.baseUrl}/api/definitions?word=${encodeURIComponent(word)}`);

        return response.json();
    }
}
