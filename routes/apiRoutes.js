const fs = require('fs');
const uuid = require('uuid');
const router = require('express').Router();

// GET Route 
router.get('/notes', (req, res) => {
  const data = fs.readFileSync('./db/db.json');
  res.json(JSON.parse(data));
})

// POST Route 
router.post('/notes', (req, res) => {
  const notes = JSON.parse(fs.readFileSync('./db/db.json'));
  const addNote = req.body;
  addNote.id = uuid.v4();
  notes.push(addNote);
  fs.writeFileSync('./db/db.json', JSON.stringify(notes));
  res.json(notes);
})

