const db = require('../models');
const User = db.user;
const Role = db.role;
const Op = db.Sequelize.Op;
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
  host: 'mail46.mydevil.net',
  port: 465,
  secure: true,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  },
});

exports.signup = (req, res) => {
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    confirmed: true,
  })
    .then((user) => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles,
            },
          },
        }).then((roles) => {
          user.setRoles(roles);
        });
      } else {
        // user role = 1
        // user moderator = 2
        // user admin = 3
        user.setRoles([3]);
      }
      jwt.sign(
        {
          userId: user.id,
        },
        process.env.SECRET_KEY,
        {
          expiresIn: 86400, // 24 hours
        },
        (err, emailToken) => {
          // const url =
          //   'https://' + process.env.DOMAIN + `/api/v1/auth/confirmation/${emailToken}`;
          // transporter
          //   .sendMail({
          //     to: req.body.email,
          //     subject: 'Confirm Email',
          //     html: `Please click this link to confirm your email: <a href="${url}">${url}</a>`,
          //   })
          //   .then((info) => {
          //     res.send({
          //       message: 'Email has been sent to: ' + req.body.email,
          //     });
          //   });

          res.send({
            message: 'User has been created',
          });
          
        }
      );
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'User Not found.' });
      }
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: 'Invalid Password!',
        });
      }

      if (!user.confirmed) {
        return res.status(401).send({
          accessToken: null,
          message: 'Confirm your email!',
        });
      }
      var token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
        expiresIn: 86400, // 24 hours
      });
      var authorities = [];
      user.getRoles().then((roles) => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push('ROLE_' + roles[i].name.toUpperCase());
        }
        res.status(200).send({
          id: user.id,
          username: user.username,
          email: user.email,
          roles: authorities,
          accessToken: token,
        });
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.confirmation = (req, res) => {

  jwt.verify(req.params.jwt_token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: 'Unauthorized!',
      });
    }
    const userId = decoded.userId;

    User.findByPk(userId).then((user) => {
      if (user.confirmed) {
        res.status(401).send({ message: 'Your account is active' });
      } else {
        User.update(
          {
            confirmed: true,
          },
          { where: { id: userId } }
        )
          .then(() => {
            return res.status(200).send({ message: 'Email confirmed.' });
          })
          .catch((err) => {
            res.status(500).send({ message: err.message });
          });
      }
    });
  });
};
