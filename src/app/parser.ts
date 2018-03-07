import { HttpClient, HttpHandler } from '@angular/common/http';
declare var System: any;   
// var json = require('./dictionary.json');




export class Parser {



    results: any;
    dictionary: any;

    constructor( ) {
        System.import('./dictionary.json').then(file => {
            this.dictionary = file;
         });
        
    }


    getDictionary(): void {
        console.dir(this.dictionary);
    }

    /*
        name: getWords
        params: 
            samples: The array of strings to test against.
        Returns: An array containing the dictionary values matching the words that have been matched.
    */
    getWords(samples: string[]): string[] {
        let regexString = '';
        Object.keys(this.dictionary).forEach((key) => {
            console.log(key);
            regexString += key + '|';
        });
        const regex = new RegExp(regexString.substring(0, regexString.length - 1));
        console.log(regex);
        console.log(samples);
        let words = [];
        samples.forEach((s) => {
            if (regex.test(s)) {
                console.log(regex.exec(s)[0]);
                words.push(s.match(regex)[0]);
            }

        });
        const newWords = words.map((word) => {
            return this.dictionary[word];
        })
        const uniqueWords = newWords.filter((elem, index, self) => {
            return index === self.indexOf(elem);
        });
        return uniqueWords;
    }
}