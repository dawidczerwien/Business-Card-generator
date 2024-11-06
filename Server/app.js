const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

var corsOptions = {
  origin: process.env.REACT_APP_SERVER_URL,
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

const db = require('./models');
const Role = db.role;
db.sequelize.sync().then(() => {
  console.log('Drop and Resync Db');
  initial();
});

function initial() {
  // Role.create({
  //   id: 1,
  //   name: 'user',
  // });

  // Role.create({
  //   id: 2,
  //   name: 'moderator',
  // });

  // Role.create({
  //   id: 3,
  //   name: 'admin',
  // });
}

app.use(express.static('static'))

app.use('/api/v1/test', require('./routes/user.routes'));
app.use('/api/v1/auth', require('./routes/auth.routes'));
app.use('/api/v1/note', require('./routes/note.routes'));
app.use('/api/v1/card', require('./routes/card.routes'));

app.get('*', (req,res) =>{
    res.sendFile(__dirname+'/static/index.html');
});

const PORT = process.env.PORT || 1234;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
