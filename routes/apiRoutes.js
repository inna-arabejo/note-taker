const fs = require('fs');
const uuid = require('uuid');
const router = require('express').Router();

// GET Route     // api/notes
router.get('/notes', (req, res) => {
  fs.readFileAsync('./db/db.json', 'utf8').then(function(data) {
    notes = [].concat(JSON.parse(data))
    res.json(notes);
  });
})

// POST Route 
router.post('/notes', (req, res) => {
  const note = req.body;
  readFileAsync('./db/db.json', 'utf8').then(function(data) {
    const notes = [].concat(JSON.parse(data));
    note.id = notes.length + 1
    notes.push(note);
  }).then(function(data) {
    fs.writeFileSync('./db/db.json', JSON.stringify(notes));
    res.json(notes);
  })
});

// DELETE Route
router.delete('/notes/:id', (req, res) => {
  const deleteID = parseInt(req.params.id);
  readFileAsync('./db/db.json', 'utf8').then(function(data) {
    const notes = [].concat(JSON.parse(data));
    const newNotes = []
    for(let i = 0; i < notes.length; i++) {
      if(newNotes !== notes[i].id) {
        newNotes.push(notes[i])
      }
    }
    return newNotes
  }).then(function(notes) {
    fs.writeFileSync('./db/db.json', JSON.stringify(notes))
    res.send('Successfully Saved!');
  })
})

module.exports = router;