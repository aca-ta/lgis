const express = require('express');
const tile = require('../app/tile');
const saveMap = require('../app/savemap');
const loadMap = require('../app/loadMap');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'Express' });
});


router.get('/tiles/:host/:db/:table/:datum/:Z/:X/:Y/', (req, res) => {
  tile.createMvt(req, (err, data) => {
    if (err) {
      console.log(err);
      res.status(500);
      res.end("error");
      return;
    }
    res.status(200).set({ 'Content-Type': 'application/x-protobuf' });
    res.end(data.getData());
  });
});


router.get('/save_map', (req, res) => {
  saveMap.save(req, data => {
    console.log(data);
    res.status(200).end(data);
  });
});

router.get('/load_map', (req, res) => {
  loadMap.load(req, data => {
    console.log(data);
    res.status(200).end(data);
  });
});


module.exports = router;
