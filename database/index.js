const Sequelize = require('sequelize');
let sequelize;

if (process.env.NODE_ENV === 'production') {
  sequelize = new Sequelize(process.env.CLEARDB_DATABASE_URL);
} else {
  sequelize = new Sequelize('persona', 'root', 'peterw', {
    host: 'localhost',
    dialect: 'mysql'
  });
}

sequelize
  .authenticate()
  .then(() => {
    console.log('Database successfully connected!');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

// INITIALIZE TABLES

const User = sequelize.import('./models/User.js');
const Prompt = sequelize.import('./models/Prompt.js');
const Answer = sequelize.import('./models/Answer.js');
const Comment = sequelize.import('./models/Comment.js');
const Tag = sequelize.import('./models/Tag.js');
const Vote = sequelize.import('./models/Vote.js');


// // FOREIGN KEY CREATION

Answer.belongsTo(User, {
  targetKey: `id`,
  constraints: false,
  onDelete: `CASCADE`,
});

Prompt.belongsTo(User, {
  targetKey: `id`,
  constraints: false,
  onDelete: `CASCADE`,
});

Comment.belongsTo(User, {
  targetKey: `id`,
  constraints: false,
  onDelete: `CASCADE`,
});

Vote.belongsTo(User, {
  targetKey: `id`,
  constraints: false,
  onDelete: `CASCADE`,
});

Answer.belongsTo(Prompt, {
  targetKey: `id`,
  constraints: false,
  onDelete: `CASCADE`,
});

Tag.belongsTo(Prompt, {
  targetKey: `id`,
  constraints: false,
  onDelete: `CASCADE`,
});

sequelize.sync( { force: true } );

const selectAll = (callback) => {
  User.findAll()
    .then((results) => {
      callback(null, results);
    })
    .catch((err) => {
      callback(err, null);
    });
};

module.exports.User = User;
module.exports.selectAll = selectAll;
module.exports.sequelize = sequelize;
