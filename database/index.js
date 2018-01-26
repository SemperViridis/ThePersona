const Sequelize = require('sequelize');

let db = null;

if (process.env.NODE_ENV === 'production') {
  db = new Sequelize(process.env.CLEARDB_DATABASE_URL);
} else {
  db = new Sequelize('persona', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
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

const User = db.define('users', {
  firstName: {
    type: Sequelize.STRING
  },
  lastName: {
    type: Sequelize.STRING
  }
});

User.sync({ force: true });

const selectAll = (callback) => {
  User.findAll({})
    .then(callback)
    .catch(callback);
};

module.exports.selectAll = selectAll;

