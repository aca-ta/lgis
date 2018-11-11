const express = require('express');
const tile = require('../app/tile');
const saveMap = require('../app/saveMap');
const loadMap = require('../app/loadMap');

const router = express.Router();

router.get('/tiles/:host/:db/:table/:datum/:Z/:X/:Y/', async (req, res) => {
  const responseFunc = (err, data) => {
    if (err) {
      console.log(err);
      res.status(500);
      res.end();
      return;
    }
    res.status(200).set({'Content-Type': 'application/x-protobuf'});
    res.end(data.getData());
  };

  const error = await tile.createMvt(req, responseFunc);
  // if Postgis error, return bad request.
  if (error) {
    if (error.message.match(/Postgis Plugin/)) {
      res.status(400).end();
    } else {
      res.status(500).end();
    }
  }
  return;
});

router.get('/save_map', (req, res) => {
  saveMap.save(req, data => {
    console.log(data);
    res.status(200).end(data);
  });
});

router.get('/load_map', (req, res) => {
  loadMap.load(req, (err, msg) => {
    if (err) {
      console.log(err);
      res.status(500);
      res.end(msg);
      return;
    }
    console.log(msg);
    res.status(200).end(msg);
  });
});

router.get('*', (req, res) => {
  res.render('index', {title: 'Express'});
});

module.exports = router;
