const fs = require('fs');
const uuid = require('uuid');
const path = require('path');
const router = require('express').Router();
const util = require('util');

router.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/notes.html'));
});

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

router.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

module.exports = router;