const fs = require('fs');

module.exports.write = (name) => {

  const basepath = `etc/savedMaps/${name}.json`;
  try {
    const stream = fs.createWriteStream(basepath, 'utf8');
    stream.write(name);
  
  } catch(err) {
    return err;
  }
}
