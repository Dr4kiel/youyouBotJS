import test from 'ava';

import StringReader from './';

test(t => {
  const stringReader = new StringReader('test test2');

  stringReader.readUntil(' ', true);
  t.is(stringReader.buffer, 'test');
  t.is(stringReader.tokens.length, 1);

  stringReader.readUntil(' ', true);
  t.is(stringReader.buffer, 'test2');
  t.is(stringReader.tokens.length, 2);
});
