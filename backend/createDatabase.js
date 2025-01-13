const sqlite3 = require('sqlite3').verbose();

// Open a database (or create one if it doesn't exist)
const db = new sqlite3.Database('./database.sqlite', (err) => {
  if (err) {
    console.error('Database connection failed', err);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

// Create the tables
db.serialize(() => {
  // Create Images table
  db.run(`
    CREATE TABLE IF NOT EXISTS images (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      url TEXT NOT NULL
    )
  `);

  // Create Annotations table
  db.run(`
    CREATE TABLE IF NOT EXISTS annotations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      image_id INTEGER,
      text TEXT NOT NULL,
      FOREIGN KEY (image_id) REFERENCES images(id)
    )
  `);
});

db.close();
