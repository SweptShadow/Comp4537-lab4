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

            // Clear previous formatted displays
            this.clearPreviousResults();

            // Display raw JSON response first
            this.feedback.textContent = JSON.stringify(result);

            // formatted display below
            const formattedDiv = document.createElement('div');

            if (result.message && result.message.includes('Warning')) {

                // Word already exists
                formattedDiv.className = 'error-display';
                formattedDiv.textContent = result.message;

            } else {

                // Success - new entry added
                formattedDiv.className = 'success-display';

                formattedDiv.innerHTML = `
                    <div><strong>Request #${result.requestCount}</strong></div>
                    <div>${result.message}</div>
                    <div><strong>"${word}"</strong>: ${definition}</div>
                    <div>Total entries: ${result.totalEntries}</div>
                `;

                // Clear the form on success
                this.wordInput.value = '';
                this.definitionInput.value = '';
            }

            this.feedback.parentNode.insertBefore(formattedDiv, this.feedback.nextSibling);
        });
    }

    clearPreviousResults() {

        // Remove any existing formatted displays
        const existingDisplays = document.querySelectorAll('.definition-display, .error-display, .success-display');
        
        existingDisplays.forEach(display => display.remove());
    }
}

// bootstrap
document.addEventListener('DOMContentLoaded', async () => {

    const langUtil = new LangUtil();

    await langUtil.loadStrings();

    const api = new ApiClient('https://lab4-dictionary-api.onrender.com');

    new StorePage(api, langUtil);
});
