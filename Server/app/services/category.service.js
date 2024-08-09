const pool = require('../config/db');
const mysql = require('mysql2');

module.exports = {
  getAll: async function (req, res) {
    let db;
    try {
      db = await pool.getConnection();
      const [results] = await db.query('SELECT * FROM Category');
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
      const [results] = await db.query('SELECT * FROM Category WHERE id = ?', [id]);
      res.json(results);
    } catch (err) {
      console.error('Không thể lấy dữ liệu từ MySQL:', err);
      res.status(500).send('Không thể lấy dữ liệu từ MySQL');
    } finally {
      if (db) db.release();
    }
  },

  createOne: async function (req, res) {
    let db;
    try {
      db = await pool.getConnection();
      const { name, desc } = req.body;
      const today = new Date();
      const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

      const [results] = await db.query(
        'INSERT INTO Category (Name, `Desc`, created_at) VALUES (?, ?, ?)',
        [name, desc, date]
      );

      res.status(200).json(results);

    } catch (err) {
      console.error('Không thể lấy dữ liệu từ MySQL:', err);
      res.status(500).send('Không thể lấy dữ liệu từ MySQL');
    } finally {
      if (db) db.release();
    }
  },

  updateOne: async function (req, res) {
    let db;
    try {
      db = await pool.getConnection();
      const { Name, Desc } = req.body;
      const [results] = await db.query('UPDATE Category SET `Desc` = ? WHERE Name LIKE ?', [Desc, Name]);

      res.status(200).json(results);

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
      const [results] = await db.query('DELETE FROM Category WHERE id = ?', [id]);

      const newAutoIncrementValue = id - 1;
      const alterTableQuery = `ALTER TABLE Category AUTO_INCREMENT = ${newAutoIncrementValue}`;

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
