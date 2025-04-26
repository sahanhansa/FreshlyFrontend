const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL Connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '#Viduruthninnada2019',
  database: 'freshly_database'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// Create profile table if it doesn't exist
connection.query(`
  CREATE TABLE IF NOT EXISTS profiles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    role VARCHAR(50) NOT NULL DEFAULT 'admin',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  )
`, (err) => {
  if (err) {
    console.error('Error creating profiles table:', err);
  }
});

// API Routes
app.get('/api/profile', (req, res) => {
  connection.query('SELECT * FROM profiles LIMIT 1', (err, results) => {
    if (err) {
      console.error('Error fetching profile:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.json(results[0] || { name: '', email: '', role: 'admin' });
  });
});

app.put('/api/profile', (req, res) => {
  const { name, email } = req.body;
  
  if (!name || !email) {
    res.status(400).json({ error: 'Name and email are required' });
    return;
  }

  connection.query(
    'INSERT INTO profiles (name, email) VALUES (?, ?) ON DUPLICATE KEY UPDATE name = ?, email = ?',
    [name, email, name, email],
    (err, results) => {
      if (err) {
        console.error('Error updating profile:', err);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }
      res.json({ id: results.insertId || results.updateId, name, email, role: 'admin' });
    }
  );
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 