const express = require('express');
const tile = require('../tiles/tile');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'Express' });
});


router.get('/tiles/:Z/:X/:Y/', (req) => {
  tile.createMvt(req, (res) => {
    res.status(200).set({ 'Content-Type': 'application/x-protobuf' });
    res.end();
  });
});


module.exports = router;
