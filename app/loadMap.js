const file = require('./lib/file');

module.exports.load = (req, func) => {

  const data = file.read(req.query.name);
  func(data);
  return `load ${req.query.name}`;
}
