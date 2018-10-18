const fs = require('fs');

module.exports.write = (name, host, db, table, datum) => {

  const basepath = `etc/savedMaps/${name}.json`;
  try {
    const stream = fs.createWriteStream(basepath, 'utf8');

    const saved = {
      name,
      host,
      db,
      table,
      datum
    }
    stream.write(JSON.stringify(saved));
  
  } catch(err) {
    return err;
  }
}
