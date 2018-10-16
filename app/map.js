module.exports.save = (req, func) => {
  const msg = "map is saved";
  console.log(msg);
  func(msg)
  return msg;
}
