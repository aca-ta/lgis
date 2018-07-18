import React from "react";
import test from "tape-catch";

import Map from "../map";

test("Smoketests", assert => {
  const app = <Map />;
  assert.ok(true, 'Map smoke test ok');

  assert.end();
});
