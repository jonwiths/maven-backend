// const mysql = require('mysql');

// const db = mysql.createPool({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_DATABASE
// });

// module.exports = { db };

const mysql = require('mysql');

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});

// Add error event listener to handle connection errors
db.on('error', function (err) {
  console.error('MySQL connection error:', err.message);
  // Attempt to reconnect to the database
  db.getConnection(function (err, connection) {
    if (err) {
      console.error('Error reconnecting to the database:', err.message);
    } else {
      console.log('Successfully reconnected to the database');
      connection.release();
    }
  });
});

module.exports = { db };
