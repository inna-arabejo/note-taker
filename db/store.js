// Dependencies
const util = require('util');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

// Store class
class Store {

  // Reads notes
  read() {
    return readFileAsync('db/db.json', 'utf8');

  }
  //  Allows user to write a note
  write(note) {
    return writeFileAsync('db/db.json', JSON.stringify(note));
  }

  // Allows user to get notes
  getNotes() {
    return this.read().then((notes) => {
      let notesArr;

      try {
        notesArr = [].concat(JSON.parse(notes));
      } catch (error) {
        notesArr = [];
      }
      return notesArr;
    });
  }

  // Allows user to add a note
  addNote(note) {
    const { title, text } = note;
    if (!title || !text) {
      throw new Error('Please enter a title or text.');
    }

    const newNote = { title, text, id: uuidv4() };

    // Retrieve all the notes using get method. Then adds new note. Then writes all the updated notes (append) and finally returns new note.
    return this.getNotes()
      .then((notes) => [...notes, newNote])
      .then((updatedNotes) => this.write(updatedNotes))
      .then(() => newNote);
  }

  // Uses id to each note to be able to delete a note
  removeNote(id) {
    return this.getNotes()
      .then((notes) => notes.filter((note) => note.id !== id))
      .then(filteredNotes => this.write(filteredNotes));
  }

}

module.exports = new Store();

