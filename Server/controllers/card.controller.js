const db = require('../models');
const Card = db.card;
const Clients = db.clients;

exports.addCard = (req, res) => {
  let slug = req.body.name.trim().replaceAll(' ', '-').toLowerCase();
  Card.destroy({
    where: {
      userId: req.userId,
      slug: slug,
    },
  }).then(() => {
    Card.create({
      username: req.body.name,
      company: req.body.company,
      phone: req.body.phone,
      email: req.body.email,
      vcardAddress: req.body.vcardAddress,
      userId: req.userId,
      slug: slug,
    })
      .then(() => {
        res.status(200).send({ message: 'Cart created successfully!', slug });
      })
      .catch((err) => {
        res.status(500).send({ message: err.message });
      });
  });
};

exports.getBusinessCard = (req, res) => {
  Card.findOne({
    where: {
      slug: req.params.id,
    },
  })
    .then((card) => {
      if (card) {
        res.status(200).send(card);
      } else {
        res.status(404).send();
      }
    })
    .catch((err) => res.status(500).send({ message: err.message }));
};

exports.deleteNote = (req, res) => {
  Card.destroy({
    where: {
      userId: req.userId,
      id: req.body.noteId,
    },
  })
    .then((Card) => {
      if (Card) {
        res.sendStatus(200).send(Card);
      }
    })
    .catch((err) => res.status(500).send({ message: err.message }));
};

exports.saveClientContactInfo = (req, res) => {
  const { phone, name, email, company, date, topic } = req.body;

  // Create an object only if data exists
  const dataObject = {};

  if (phone) {
    dataObject.phone = phone;
  }
  if (name) {
    dataObject.name = name;
  }
  if (email) {
    dataObject.email = email;
  }
  if (company) {
    dataObject.company = company;
  }
  if (date) {
    dataObject.date = date;
  }
  if (topic) {
    dataObject.topic = topic;
  }

  // Now dataObject contains only the properties that exist in req.body
  Clients.findOne({ where: { phone: phone } })
    .then(function (obj) {
      if (obj) {
        obj.update(dataObject);
      } else {
        Clients.create(dataObject);
      }
      res.status(200).send('Data updated successfully!');
    })
    .catch((err) => res.status(500).send({ message: err.message }));

  // Card.update(
  //   { content: req.body.content },
  //   {
  //     where: {
  //       phone: req.userId,
  //       id: req.body.noteId,
  //     },
  //   }
  // )
  //   .then((notes) => {
  //     if (notes) {
  //       res.status(200).send('Data updated successfully!');
  //     }
  //   })
  //   .catch((err) => res.status(500).send({ message: err.message }));
};
