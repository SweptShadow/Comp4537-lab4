/**
 * Dictionary data store for managing word-definition pairs in memory, also provides functionality to add 
 * new entries & retrieve existing definitions, stores data in array of obj w/ word & definition properties.
 * 
 * @class Dictionary
 */

class Dictionary {

    constructor() {

        this.entries = [];

    }

    add(word, definition) {

        if (this.entries.some(e => e.word === word)) {

            return { exists: true };
        }

        this.entries.push({ word, definition });

        return { exists: false, total: this.entries.length };

    }

    find(word) {

        return this.entries.find(e => e.word === word);

    }
}

module.exports = Dictionary;
