import React from 'react';
import {shallow} from 'enzyme';
import test from 'tape-catch';
import sinon from 'sinon';
import Map from '../../../client/js/map';

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
