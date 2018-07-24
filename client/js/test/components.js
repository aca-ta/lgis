import React from "react";
import { shallow } from "enzyme";
import test from "tape-catch";
import Map from "../map";
import sinon from "sinon";

test("Mounting the Map", assert => {
  const viewport = sinon.spy();
  const mapstyle = sinon.spy();
  const map = shallow(<Map viewport={viewport} mapstyle={mapstyle} />);
  assert.ok(map.exists(), "Map mounted");
  map.unmount();
  assert.ok(true, "App unmounted");
  assert.end();
});
