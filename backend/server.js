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

// Create customers table if it doesn't exist
connection.query(`
  CREATE TABLE IF NOT EXISTS customers (
    customerId VARCHAR(36) PRIMARY KEY,
    firstName VARCHAR(255),
    lastName VARCHAR(255),
    email VARCHAR(255),
    username VARCHAR(255),
    addressId VARCHAR(36),
    address VARCHAR(255),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`, (err) => {
  if (err) {
    console.error('Error creating customers table:', err);
  }
  
  // Check if we need to seed sample data
  connection.query('SELECT COUNT(*) as count FROM customers', (err, results) => {
    if (err) {
      console.error('Error checking customers count:', err);
      return;
    }
    
    if (results[0].count === 0) {
      console.log('Seeding sample customers...');
      
      // Add some sample customers
      const sampleCustomers = [
        {
          customerId: '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed',
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com',
          username: 'johndoe',
          addressId: 'addr-001',
          address: '123 Main St, Anytown, USA'
        },
        {
          customerId: '2c9e7bce-ccfe-5c3e-0c6e-bc9efcce5cfe',
          firstName: 'Jane',
          lastName: 'Smith',
          email: 'jane.smith@example.com',
          username: 'janesmith',
          addressId: 'addr-002',
          address: '456 Oak Ave, Somewhere, USA'
        },
        {
          customerId: '3d0f8cdf-ddff-6d4f-1d7f-cd0fddff6dff',
          firstName: 'Robert',
          lastName: 'Johnson',
          email: 'robert.johnson@example.com',
          username: 'robertj',
          addressId: 'addr-003',
          address: '789 Pine Blvd, Nowhere, USA'
        }
      ];
      
      sampleCustomers.forEach(customer => {
        connection.query(
          'INSERT INTO customers (customerId, firstName, lastName, email, username, addressId, address) VALUES (?, ?, ?, ?, ?, ?, ?)',
          [
            customer.customerId,
            customer.firstName,
            customer.lastName,
            customer.email,
            customer.username,
            customer.addressId,
            customer.address
          ],
          (err) => {
            if (err) {
              console.error(`Error inserting sample customer ${customer.firstName}:`, err);
            }
          }
        );
      });
      
      console.log('Sample customers seeded successfully');
    }
  });
});

// Customer API Routes
app.get('/api/customer', (req, res) => {
  connection.query('SELECT customerId, firstName, lastName, email, username, addressId, address, JSON_ARRAY() as contacts FROM customers', (err, results) => {
    if (err) {
      console.error('Error fetching customers:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    
    // Add empty contacts array to each customer
    const customers = results.map(customer => {
      return {
        ...customer,
        contacts: []
      };
    });
    
    res.json(customers);
  });
});

app.get('/api/customer/:id', (req, res) => {
  const customerId = req.params.id;
  
  connection.query(
    'SELECT customerId, firstName, lastName, email, username, addressId, address, JSON_ARRAY() as contacts FROM customers WHERE customerId = ?',
    [customerId],
    (err, results) => {
      if (err) {
        console.error(`Error fetching customer with ID ${customerId}:`, err);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }
      
      if (results.length === 0) {
        res.status(404).json({ error: 'Customer not found' });
        return;
      }
      
      // Add empty contacts array
      const customer = {
        ...results[0],
        contacts: []
      };
      
      res.json(customer);
    }
  );
});

app.delete('/api/customer/:id', (req, res) => {
  const customerId = req.params.id;
  
  console.log(`Received request to delete customer with ID: ${customerId}`);
  
  connection.query(
    'DELETE FROM customers WHERE customerId = ?',
    [customerId],
    (err, results) => {
      if (err) {
        console.error(`Error deleting customer with ID ${customerId}:`, err);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }
      
      if (results.affectedRows === 0) {
        console.log(`No customer found with ID ${customerId}`);
        res.status(404).json({ error: 'Customer not found' });
        return;
      }
      
      console.log(`Successfully deleted customer with ID ${customerId}`);
      res.sendStatus(204); // No content, operation successful
    }
  );
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});