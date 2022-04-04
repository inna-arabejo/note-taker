const path = require('path');
const router = require('express').Router();

// Get notes route to the notes.html file
router.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/notes.html'));
});

// Get everything else route to index.html file
router.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

module.exports = router;