const Sequelize = require('sequelize');

let db;

if (process.env.NODE_ENV === 'production') {
  db = new Sequelize(process.env.CLEARDB_DATABASE_URL);
} else {
  db = new Sequelize('', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
  });

  return db.query("CREATE DATABASE `persona`;").then(data => {
    USE `persona`;
  });
}

db
  .authenticate()
  .then(() => {
    console.log('Database successfully connected!');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });


// SAMPLE
const User = db.define('users', {
  firstName: {
    type: Sequelize.STRING
  },
  lastName: {
    type: Sequelize.STRING
  }
});

// SAMPLE
User.sync({ force: true });

const selectAll = (callback) => {
  User.findAll({})
    .then(callback)
    .catch(callback); // Need to revisit this
};

module.exports.selectAll = selectAll;

