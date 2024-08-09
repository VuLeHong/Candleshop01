const pool = require('../config/db');
const mysql = require('mysql2');

module.exports = {
  getAll: async function (req, res) {
    let db;
    try {
      db = await pool.getConnection();
      const [results] = await db.query('SELECT * FROM Orders');
      res.json(results);
    } catch (err) {
      console.error('Không thể lấy dữ liệu từ MySQL:', err);
      res.status(500).send('Không thể lấy dữ liệu từ MySQL');
    } finally {
      if (db) db.release();
    }
  },

  getOne: async function (req, res) {
    let db;
    try {
      db = await pool.getConnection();
      const id = req.params.id || '';
      const [results] = await db.query('SELECT * FROM Orders WHERE id = ?', [id]);
      res.json(results);
    } catch (err) {
      console.error('Không thể lấy dữ liệu từ MySQL:', err);
      res.status(500).send('Không thể lấy dữ liệu từ MySQL');
    } finally {
      if (db) db.release();
    }
  },

  updateItem: async function (req, res) {
    let db;
    try {
      db = await pool.getConnection();
      const Order_id = req.params.id || '';
      const { Cart_items } = req.body;

      for (const item of Cart_items) {
        const Product_id = item.id;
        const Quantity = item.Quantity;

        await db.query('INSERT INTO Order_item (Order_id, Product_id, Quantity) VALUES (?, ?, ?)', [Order_id, Product_id, Quantity]);
      }

      res.status(200).json({ message: 'Items updated successfully' });

    } catch (error) {
      console.error('Error inserting into MySQL:', error);
      res.status(500).send('Error inserting into MySQL');
    } finally {
      if (db) db.release();
    }
  },

  createOne: async function (req, res) {
    let db;
    try {
      db = await pool.getConnection();
      const { User_name, Gmail, Phone_Number, Address, Amount } = req.body;
      const today = new Date();
      const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

      const [results] = await db.query(
        'INSERT INTO Orders (User_name, Gmail, Phone_Number, Address, Amount, created_at) VALUES (?, ?, ?, ?, ?, ?)',
        [User_name, Gmail, Phone_Number, Address, Amount, date]
      );

      res.status(200).json(results.insertId);

    } catch (err) {
      console.error('Không thể lấy dữ liệu từ MySQL:', err);
      res.status(500).send('Không thể lấy dữ liệu từ MySQL');
    } finally {
      if (db) db.release();
    }
  },

  deleteOne: async function (req, res) {
    let db;
    try {
      db = await pool.getConnection();
      const id = req.params.id || '';

      const [results] = await db.query('DELETE FROM Orders WHERE id LIKE ?', [id]);

      const newAutoIncrementValue = id - 1;
      const alterTableQuery = `ALTER TABLE Orders AUTO_INCREMENT = ${newAutoIncrementValue}`;

      await db.query(alterTableQuery);

      res.status(200).json(results);

    } catch (err) {
      console.error('Không thể xóa người dùng:', err);
      res.status(500).send('Không thể xóa người dùng');
    } finally {
      if (db) db.release();
    }
  },
};
