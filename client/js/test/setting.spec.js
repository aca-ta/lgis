import test from 'tape-catch';
import _ from 'lodash';
import sinon from 'sinon';
import setting from '../setting';

test('fetch JSON from setting', assert => {
  document.body.innerHTML = `<textarea>{"test": "test"}</textarea>`;
  const actual = setting('textarea');
  const expected = {test: 'test'};
  assert.ok(_.isEqual(actual, expected), 'setting test ok');
  assert.end();
});
