/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    let chain = new Map();

    for(let i =0; i < this.words.length; i += 1) {
      let word = this.words[i];
      let nextWord = this.words[i+1] || null;

      if(chain.has(word)) chain.get(word).psuh(nextWord);
      else chain.set(word, [nextWord]);
    }
    this.chain = chain;
  }

  /** return random text from chains */
  static choice(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }
  
  makeText(numWords = 100) {
    let keys = Array.from(this.makeChains.keys());
    let key = MarkovMachine.choice(keys);
    let output = []

    while (output.length < numWords && key != null) {
      output.push(key)
      key = MarkovMachine.choice(this.chain.get(key));
    }
    return output.join(" ");
  }
}

export default MarkovMachine
