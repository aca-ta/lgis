const file = require('./lib/file');

module.exports.save = (req, func) => {
  const msg = `${req.query.name} is saved`;
  file.write(req.query.name)
  func(msg)
  return msg;
}
