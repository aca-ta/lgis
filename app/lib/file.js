const fs = require('fs');
const mkdirp = require('mkdirp')

const baseDir = "etc/savedMaps"

const getSavedMapPath = (name) => {
  return `${baseDir}/${name}.json`;
} 

module.exports.write = (name, settings, geomType, table) => {

	if (!fs.existsSync(baseDir)) {
			mkdirp.sync(baseDir);
	}
  const basePath = getSavedMapPath(name);
  const stream = fs.createWriteStream(basePath, 'utf8');

  const saved = {
    name,
    settings,
    geomType,
    table,
  }
  stream.write(JSON.stringify(saved));
  
}

module.exports.read = (name) => {

  const basePath = getSavedMapPath(name);

  const data = fs.readFileSync(basePath);
  return data
}
