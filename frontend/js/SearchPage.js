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

            this.result.textContent = JSON.stringify(data);
        });
    }
}

// bootstrap
document.addEventListener('DOMContentLoaded', async () => {

    const langUtil = new LangUtil();
    await langUtil.loadStrings();

    const api = new ApiClient('https://BackendDomain.xyz'); // replace with backend URL

    new SearchPage(api, langUtil);
});
