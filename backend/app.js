const express = require('express');
const path = require('path');
const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const annotationRoutes = require('./routes/annotation');
const imageRoutes = require('./routes/images');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api/annotations', annotationRoutes);
app.use('/api/images', imageRoutes);

// Setup SQLite database (or you can use JSON)
const db = new sqlite3.Database('./database.sqlite', (err) => {
  if (err) {
    console.error('Database connection failed', err);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
