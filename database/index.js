const mysql = require('mysql');

let connection = '';

if (process.env.NODE_ENV === 'production') {
  connection = process.env.CLEARDB_DATABASE_URL;
} else {
  connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'persona'
  });
}

const selectAll = (callback) => {
  connection.query('SELECT * FROM items', (err, results, fields) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results, fields);
    }
  });
};

module.exports.selectAll = selectAll;

