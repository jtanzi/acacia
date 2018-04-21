import { HttpClient, HttpHandler } from '@angular/common/http';
declare var System: any;
// let json = require('./dictionary.json');
import * as data from './dictionary.json';

export class Parser {

    results: any;
    dictionary: any;

    constructor( ) {
        // System.import('./dictionary.json').then(file => {
        //     this.dictionary = file;
        //  });
        this.dictionary = data;
    }


    private getDictionary(): void {
        console.dir(this.dictionary);
    }

    /*
        name: getWords
        params:
            samples: The array of strings to test against.
        Returns: An array containing the dictionary values matching the words that have been matched.
    */
    getWords(samples: string[]): string[] {
        console.dir(samples);
        let regexString = '';
        Object.keys(this.dictionary).forEach((key) => {
            // console.log(key);
            regexString += key + '|';
        });
        const regex = new RegExp(regexString.substring(0, regexString.length - 1));
        // console.log(regex);
        // console.log(samples);
        const words = [];
        samples.forEach((s) => {
            if (regex.test(s)) {
                words.push(s.match(regex)[0]);
            } else {
                words.push(s);
            }
        });

        // console.dir(words);
        const newWords = words.map((word) => {
            if (this.dictionary[word]) {
                return this.dictionary[word];
            } else {
                return word;
            }
        })
        console.dir(newWords);
        const uniqueWords = this.uniqueWords(newWords);
        return uniqueWords;
    }

    uniqueWords(arr: string[]) {
        return arr.sort().filter((item, pos, ar) => {
            return !pos || item != ar[pos - 1];
        })
    }
}
