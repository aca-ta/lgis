const file = require('./lib/file');

module.exports.load = (req, func) => {

  let data = "";
  try {
    data = file.read(req.query.name);
  } catch (err) {
    if (err.code === 'ENOENT') {
      const msg = `ERROR: ${req.query.name} not found.`;
      return func(err, msg);
    } else {
      const msg = 'ERROR: unexpected error occurs.';
      return func(err, msg);
    }
  }
  console.log(`data: ${data}`);
  func(null, data);
  return `load ${req.query.name}`;
}
