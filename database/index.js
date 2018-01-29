const Sequelize = require('sequelize');

let db;


if (process.env.NODE_ENV === 'production') {
  db = new Sequelize(process.env.CLEARDB_DATABASE_URL);
} else {
  db = new Sequelize('persona', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
  });
  // createPersona();

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
  },
  firstName: {
    type: Sequelize.STRING,
    allowNull: true
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: true
  }
});

const Prompt = db.define('prompts', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  question: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  createdAt: Sequelize.DATE,
});

const Answer = db.define('answers', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  response: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  createdAt: Sequelize.DATE,
});

const Comment = db.define('comments', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  cmnt: {
    type: Sequelize.TEXT,
    allowNull: false
  }
});

const Tag = db.define('tags', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  tagname: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

const Vote = db.define('votes', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  }
});


// CREATE ENTRIES
User.sync({ force: true });
Prompt.sync({ force: true });
Answer.sync({ force: true });
Comment.sync({ force: true });
Vote.sync({ force: true });

// FOREIGN KEY CREATION
User.hasMany(Prompt, {
  foreignKey: {
    name: 'userid',
    allowNull: false
  }
});

User.hasMany(Answer, {
  foreignKey: {
    name: 'userid',
    allowNull: false
  }
});

User.hasMany(Comment, {
  foreignKey: {
    name: 'userid',
    allowNull: false
  }
})

User.hasMany(Tag, {
  foreignKey: {
    name: 'userid',
    allowNull: false
  }
});

User.hasMany(Vote, {
  foreignKey: {
    name: 'userid',
    allowNull: false
  }
});


Prompt.hasMany(Answer, {
  foreignKey: {
    name: 'promptid',
    allowNull: false
  }
});

Prompt.hasMany(Tag, {
  foreignKey: {
    name: 'promptid',
    allowNull: false
  }
});

Vote.hasOne(Answer);
Vote.hasOne(Comment);
Vote.hasOne(Prompt);

const selectAll = (callback) => {
  Users.findAll()
    .then((results) => {
      callback(null, results);
    })
    .catch((err) => {
      callback(err, null);
    });
};

module.exports.selectAll = selectAll;