/**
 * Dictionary data store for managing word-definition pairs in memory, also provides functionality to add 
 * new entries & retrieve existing definitions, stores data in array of obj w/ word & definition properties.
 * 
 * @class Dictionary
 */

class Dictionary {

    constructor() {

        this.dictionary = [];

    }

    add(word, definition) {

        if (this.dictionary.some(e => e.word === word)) {

            return { exists: true };
        }

        this.dictionary.push({ word, definition });

        return { exists: false, total: this.dictionary.length };

    }

    find(word) {

        return this.dictionary.find(e => e.word === word);

    }
}

module.exports = Dictionary;
