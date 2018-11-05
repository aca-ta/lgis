const file = require('./lib/file');

module.exports.save = (req, func) => {
  file.write(
    req.query.name,
    req.query.settings,
    req.query.geomtype,
    req.query.table,
  );
  const msg = `save ${req.query.name}`;
  func(msg);
  return msg;
};
