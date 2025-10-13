/**
 * Controller for search page functionality, manages user interactions for searching dictionary definitions & displaying results.
 * Handles DOM manipulation, input validation & API communication for word lookups.
 * 
 * @class SearchPage
 */

class SearchPage {

    constructor(apiClient, langUtil) {

        this.apiClient = apiClient;
        this.langUtil = langUtil;
        this.searchBtn = document.getElementById('searchBtn');
        this.searchInput = document.getElementById('searchWord');
        this.result = document.getElementById('result');

        this.attachEvents();
    }

    attachEvents() {

        this.searchBtn.addEventListener('click', async () => {

            const word = this.searchInput.value.trim();

            if (!word) {

                this.result.textContent = this.langUtil.getString('validation.enterWord');

                return;
            }

            const data = await this.apiClient.getDefinition(word);

            // Clear any previous formatted displays
            this.clearPreviousResults();

            // Display raw JSON response first
            this.result.textContent = JSON.stringify(data);

            // formatted display below
            if (data.entry) {

                // Word found - create formatted display
                const formattedDiv = document.createElement('div');

                formattedDiv.className = 'definition-display';

                formattedDiv.innerHTML = `
                    <div class="definition-word">${data.entry.word}</div>
                    <div class="definition-text">${data.entry.definition}</div>
                `;

                this.result.parentNode.insertBefore(formattedDiv, this.result.nextSibling);
            } else {

                // Word not found - create error display
                const errorDiv = document.createElement('div');
                errorDiv.className = 'error-display';
                errorDiv.textContent = `Request# ${data.requestCount}, word '${word}' not found!`;
                this.result.parentNode.insertBefore(errorDiv, this.result.nextSibling);
            }
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

    new SearchPage(api, langUtil);
});
