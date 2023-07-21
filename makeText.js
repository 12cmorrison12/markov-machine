/** Command-line tool to generate Markov text. */

import { require, readFile } from 'fs';
import { process } from 'axios';

const markov = require("./markov");


/**generate text from markov machine */

function generateText(text) {
    let mm = markov.MarkovMachine(text);
    console.log(mm.makeText());
}

/**read text file to make text from it */

function makeText(path) {
    readFile(path, "utf8", function cb(error, data) {
        if (error) {
            console.error(`Cannot read file: ${path}: ${error}`);
            exit(1);
        } else {
            generateText(data);
        }
    });
}

/** read url provided */

async function makeURLText(url) {
    let response;

    try {
        response = await get(url);
    } catch (error) {
        console.error(`Cannot read URL: ${url}: ${error}`);
        exit(1);
    }
    generateText(response.data)
}

/** interpret cmdline to decide what to do. */

let [method, path] = process.argv.slice(2);

if (method === "file") {
  makeText(path);
}

else if (method === "url") {
  makeURLText(path);
}

else {
  console.error(`Unknown method: ${method}`);
  exit(1);
}