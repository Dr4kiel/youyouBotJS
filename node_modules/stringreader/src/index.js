class StringReader {
  constructor(input) {
    this.input = input;
    this.reset();
  }

  reset() {
    this.currentIndex = 0;
    this.tokens = [];
    this.clearBuffer();
  }

  clearBuffer() {
    this.buffer = '';
  }

  // TODO: Can we get a generator here?
  readUntil(character, omitCharacter, notFoundFn) {
    /* eslint-disable no-constant-condition */

    this.clearBuffer();

    const omitChar = (omitCharacter == null) ? false : omitCharacter;

    let counter = 0;

    if (!omitChar) {
      if (this.input.substr(this.currentIndex, character.length) === character) {
        this.currentIndex += character.length;
        this.tokens.push(character);
        return character;
      }
    }

    // Not liking the contant here :'(
    while (true) {
      if (this.end()) {
        if (notFoundFn) {
          notFoundFn(this.buffer);
        }
        break;
      }

      if (character.length === 1) {
        if (this.input[this.currentIndex] === character) {
          break;
        }
      } else {
        let skip = true;
        for (let i = 0, len = character.length; i < len; i++) {
          const c = character[i];

          if (!(this.input[this.currentIndex + counter] !== c)) {
            continue;
          }
          skip = false;
          break;
        }
        counter++;
        if (skip) {
          break;
        }
      }
      this.buffer += this.input[this.currentIndex];
      this.currentIndex++;
    }

    if (omitChar) {
      this.currentIndex += character.length;
    }

    this.tokens.push(this.buffer);

    return this.buffer;
  }

  readLine(notFoundFn) {
    return this.readUntil('\n', true, notFoundFn);
  }

  end() {
    return this.currentIndex >= this.input.length;
  }
}

export default StringReader;
