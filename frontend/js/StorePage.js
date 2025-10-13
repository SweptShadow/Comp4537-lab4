/**
 * Controller for store page functionality, manages user interactions for adding new word definitions to dictionary.
 * Handles form submission, input validation & API communication for creating entries.
 * 
 * @class StorePage
 */

class StorePage {

    constructor(apiClient, langUtil) {

        this.apiClient = apiClient;
        this.langUtil = langUtil;
        this.form = document.getElementById('storeForm');
        this.wordInput = document.getElementById('word');
        this.definitionInput = document.getElementById('definition');
        this.feedback = document.getElementById('feedback');

        this.attachEvents();
    }

    attachEvents() {

        this.form.addEventListener('submit', async (e) => {

            e.preventDefault();

            const word = this.wordInput.value.trim();
            const definition = this.definitionInput.value.trim();

            if (!word || !definition) {

                this.feedback.textContent = this.langUtil.getString('validation.enterBothFields');

                return;
            }

            const result = await this.apiClient.addDefinition(word, definition);

            this.feedback.textContent = JSON.stringify(result);
        });
    }
}

// bootstrap
document.addEventListener('DOMContentLoaded', async () => {

    const langUtil = new LangUtil();
    
    await langUtil.loadStrings();

    const api = new ApiClient('https://BackendDomain.xyz'); // replace with backend URL

    new StorePage(api, langUtil);
});
