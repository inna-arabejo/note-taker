const util = require('util');
const fs = require('fs');
const uuid = require('uuid');

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class Store {


  read() {
    return readFileAsync('db/db.json', 'utf8');

  }
  write(note) {
    return writeFileAsync('db/db.json', JSON.stringify(note));
  }

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

  addNote(note) {
    const { title, text } = note;
    if (!title || !text) {
      throw new Error('Please enter a title or text.');
    }

    const newNote = { title, text, id: uuid.v4 }

    // retrieve all the notes using get method. Then adding new note. Then write all the updated notes (append) and finally return new note
    return this.getNotes()
      .then((notes) => [...notes, newNote])
      .then((updatedNotes) => this.write(updatedNotes))
      .then(() => newNote);
  }

  removeNote(id) {
    return this.getNotes()
      .then((notes) => notes.filter((note) => note.id !== id))
      .then((filteredNotes) => this.write(filteredNotes))
  }

}

module.exports = new Store();

