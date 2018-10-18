const fs = require('fs');

const getSavedMapPath = (name) => {
  return `etc/savedMaps/${name}.json`;
} 

module.exports.write = (name, host, db, table, datum) => {

  const basepath = getSavedMapPath(name);
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
