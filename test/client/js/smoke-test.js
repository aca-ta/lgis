import React from "react";
import test from "tape-catch";

import Map from "../../../client/js/map";

test("Smoketests", assert => {
  const app = <Map />;
  assert.ok(true, 'Map smoke test ok');

  assert.end();
});
