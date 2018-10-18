const file = require('./lib/file');

module.exports.save = (req, func) => {
  const msg = `${req.query.name} is saved`;
  file.write(req.query.name, req.query.host, req.query.db, req.query.table, req.query.datum)
  func(msg)
  return msg;
}
