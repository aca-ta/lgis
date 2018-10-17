module.exports.save = (req, func) => {
  const msg = `${req.query.name} is saved`;
  func(msg)
  return msg;
}
