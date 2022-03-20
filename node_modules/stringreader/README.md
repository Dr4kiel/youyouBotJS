# stringreader
Simple string reader for JavaScript

## Installation
`npm install stringreader`

## Usage
```javascript
var StringReader = require('stringreader');

var reader = new StringReader('Split this text by spaces.');

while (!reader.end()) {
  console.log(reader.readUntil(' ', true));
}
```

This is largely based on a [gist](https://gist.github.com/frostney/4746769) I made a couple of years ago.

## License
MIT
