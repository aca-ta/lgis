import React from 'react';
import {shallow} from 'enzyme';
import test from 'tape-catch';
import _ from 'lodash';
import sinon from 'sinon';
import Map from '../map';
import setting from '../setting';

test('Mounting the Map', assert => {
  document.body.innerHTML = `<button id="lgis-show-table">button</button>`;
  const viewport = sinon.spy();
  const mapstyle = sinon.spy();
  const map = shallow(<Map viewport={viewport} mapstyle={mapstyle} />);
  assert.ok(map.exists(), 'Map mounted');
  map.unmount();
  assert.ok(true, 'App unmounted');
  assert.end();
});

test('fetch JSON from setting', assert => {
  document.body.innerHTML = `<textarea>{"test": "test"}</textarea>`;
  const actual = setting('textarea');
  const expected = {test: 'test'};
  assert.ok(_.isEqual(actual, expected), 'setting test ok');
  assert.end();
});
