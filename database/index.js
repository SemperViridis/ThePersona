const Sequelize = require('sequelize');

let db;
const createPersona = () => {
  return db.query("DROP DATABASE IF EXISTS `persona`;")
  .then(db.query("CREATE DATABASE `persona`;"))
  .then(db.query("USE `persona`;"))
};

if (process.env.NODE_ENV === 'production') {
  db = new Sequelize(process.env.CLEARDB_DATABASE_URL);
} else {
  db = new Sequelize('persona', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
  });
  createPersona();

  // return db.query("DROP DATABASE IF EXISTS `persona`;")
  //   .then(db.query("CREATE DATABASE `persona`;"))
  //   .then(db.query("USE `persona`;"))
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
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false
  }  
  firstName: {
    type: Sequelize.STRING
  },
  lastName: {
    type: Sequelize.STRING
  }
});

const Prompts = db.define('prompts', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  question: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  id_user: {
    type: Sequelize.INTEGER,
    references: {
      model: User,
      key: 'id',
    }
  },
  createdAt: Sequelize.DATE,
});

const Answers = db.define('answers', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  response: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  id_prompt: {
    type: Sequelize.INTEGER,
    references: {
      model: Prompts,
      key: 'id',
    },
  },
  id_user: {
    type: Sequelize.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
  },
  createdAt: Sequelize.DATE,
});

// SAMPLE
User.sync({ force: true });

Prompts.sync({ force: true});

Answers.sync({ force: true});

const selectAll = (callback) => {
  User.findAll({})
    .then((results) => {
      callback(null, results);
    })
    .catch((err) => {
      callback(err, null);
    }); // Need to revisit this
};





module.exports.selectAll = selectAll;

