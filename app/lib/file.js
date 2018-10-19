const fs = require('fs');

const getSavedMapPath = (name) => {
  return `etc/savedMaps/${name}.json`;
} 

module.exports.write = (name, host, db, table, datum) => {

  const basePath = getSavedMapPath(name);
  const stream = fs.createWriteStream(basePath, 'utf8');

  const saved = {
    name,
    host,
    db,
    table,
    datum
  }
  stream.write(JSON.stringify(saved));
  
}

module.exports.read = (name) => {

  const basePath = getSavedMapPath(name);

  fs.readFile(basePath, 'utf8', (err, text) => {
    if (err) {
      return err;
    }
    return text;
  });

}
