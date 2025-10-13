/**
 * Utility for loading & formatting strings from JSON files.
 * 
 * @class LangUtil
 */

const fs = require('fs');
const path = require('path');

class LangUtil {

    constructor(language = 'en') {
        
        this.language = language;
        this.strings = this.loadStrings();
    }

    loadStrings() {

        try {
            
            const langPath = path.join(__dirname, '../lang', this.language, `${this.language}.json`);
            const data = fs.readFileSync(langPath, 'utf8');

            return JSON.parse(data);

        } catch (error) {

            console.error('Failed to load language strings:', error);
            return {};
        }
    }

    getString(path, replacements = {}) {

        const keys = path.split('.');
        let value = this.strings;

        for (const key of keys) {

            value = value[key];

            if (value === undefined) {

                // Return the path if string not found
                return path; 
            }
        }

        // Replace placeholders like {word}, {port}
        let result = value;

        for (const [key, replacement] of Object.entries(replacements)) {

            result = result.replace(`{${key}}`, replacement);
        }

        return result;
    }
}

module.exports = LangUtil;