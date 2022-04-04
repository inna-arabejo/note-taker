const store = require('../db/store');
const router = require('express').Router();



// GET Route     // api/notes
router.get('/notes', (req, res) => {
  store
  .getNotes()
  .then(notes => res.json(notes))
  
  .catch(err => res.status(500).json(err));
  });


// POST Route 
router.post('/notes', (req, res) => {
  store
  .addNote(req.body)
  .then((note) => res.json(note))

  .catch(err => res.status(500).json(err));
  });

// DELETE Route
router.delete('/notes/:id', function (req, res) {
  store
  .removeNote(req.params.id)
  .then(() => res.json({ ok: true }))

  .catch(err => res.status(500).json(err));
  });

module.exports = router;