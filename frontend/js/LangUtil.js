/**
 * Language utility for loading and formatting localized strings from JSON files (Frontend version).
 * Provides centralized access to user-facing text for internationalization support.
 * 
 * @class LangUtil
 */

class LangUtil {

    constructor(language = 'en') {

        this.language = language;
        this.strings = null;
    }

    async loadStrings() {

        try {

            const response = await fetch(`lang/${this.language}/${this.language}.json`);
            this.strings = await response.json();

            return this.strings;

        } catch (error) {

            console.error('Failed to load language strings:', error);
            this.strings = {};

            return {};
        }
    }

    getString(path, replacements = {}) {

        if (!this.strings) {

            console.warn('Strings not loaded yet');

            return path;
        }

        const keys = path.split('.');
        let value = this.strings;

        for (const key of keys) {

            value = value[key];

            if (value === undefined) {

                // Return the path if string not found
                return path; 
            }
        }

        // Replace placeholders like {word}, {port}, ChatGPT helped create this function to fix errors within this file
        let result = value;

        for (const [key, replacement] of Object.entries(replacements)) {

            result = result.replace(`{${key}}`, replacement);
        }

        return result;
    }
}