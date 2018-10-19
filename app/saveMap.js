const file = require('./lib/file');

module.exports.save = (req, func) => {
  file.write(
    req.query.name,
    req.query.host,
    req.query.db,
    req.query.table,
    req.query.datum,
  );
  const msg = `save ${req.query.name}`;
  func(msg);
  return msg;
};
