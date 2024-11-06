const db = require('../models');
const Note = db.note;

exports.addNote = (req, res) => {
  Note.create({
    content: req.body.content,
    userId: req.userId,
  })
    .then(() => {
      res.status(200).send('Note created successfully!');
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.getUserNotes = (req, res) => {
  Note.findAll({
    where: {
      userId: req.userId,
    },
  })
    .then((notes) => {
      if (notes) {
        res.status(200).send(notes);
      }
    })
    .catch((err) => res.status(500).send({ message: err.message }));
};

exports.deleteNote = (req, res) => {
  Note.destroy({
    where: {
      userId: req.userId,
      id: req.body.noteId
    },
  })
    .then((notes) => {
      if (notes) {
        res.sendStatus(200).send(notes);
      }
    })
    .catch((err) => res.status(500).send({ message: err.message }));
};

exports.updateNote = (req, res) => {
  Note.update({content: req.body.content},{
    where: {
      userId: req.userId,
      id: req.body.noteId
    },
  })
    .then((notes) => {
      if (notes) {
        res.status(200).send("Note updated successfully!");
      }
    })
    .catch((err) => res.status(500).send({ message: err.message }));
};