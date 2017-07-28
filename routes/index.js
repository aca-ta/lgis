const express = require('express');
const tile = require('../tiles/tile');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'Express' });
});


router.get('/tiles/:Z/:X/:Y/', (req, res) => {
  tile.createMvt(req, (err, data) => {
    res.status(200).set({ 'Content-Type': 'application/x-protobuf' });
    res.end(data.getData());
  });
});


module.exports = router;
