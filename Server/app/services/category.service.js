const pool =require('../config/db');
const mysql = require('mysql2');
module.exports = {
    getAll: async function (req, res) {
        const db = await pool.getConnection();
        db.query('SELECT * FROM Category', (err, results) => {
            if (err) {
              console.error('Không thể lấy dữ liệu từ MySQL:', err);
              res.status(500).send('Không thể lấy dữ liệu từ MySQL');
              return;
            }
            res.json(results);
          });
          db.release();  
    },

    getOne: async function (req, res) {
        const db = await pool.getConnection();
        let id = req.params.id || '';
        db.query('SELECT * FROM Category WHERE id = ?', [id], (err, results) => {
            if (err) {
              console.error('Không thể lấy dữ liệu từ MySQL:', err);
              res.status(500).send('Không thể lấy dữ liệu từ MySQL');
              return;
            }
            res.json(results);
          });
          db.release();  
    },
    createOne: async function (req, res) {
        const db = await pool.getConnection();
        const {name: name, desc: desc} = req.body;
        const today = new Date();
        const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        db.query('INSERT INTO Category (Name, `Desc`, created_at) VALUES (?, ?, ?)', [name, desc, date], (err, results) => {
            if (err) {
            console.error('Không thể lấy dữ liệu từ MySQL:', err);
            res.status(500).send('Không thể lấy dữ liệu từ MySQL');
            return;
            }
            res.status(200).json(results);
        });
        db.release(); 
    },
    updateOne: async function (req, res) {
        const db = await pool.getConnection();
        const {Name: Name, Desc: Desc} = req.body;
        db.query('UPDATE Category SET `Desc` = ? WHERE Name LIKE ?',[Desc, Name], (err, results) => {
            if (err) {
            console.error('Không thể lấy dữ liệu từ MySQL:', err);
            res.status(500).send('Không thể lấy dữ liệu từ MySQL');
            return;
            }
            res.status(200).json(results);
        });
        db.release(); 
    },
    deleteOne: async function (req, res) {
        const db = await pool.getConnection();
        let id = req.params.id || '';
            const categoryId = id;
            const newAutoIncrementValue = categoryId - 1;
            const alterTableQuery = `ALTER TABLE Category AUTO_INCREMENT = ${newAutoIncrementValue}`;
            db.query('DELETE FROM Category WHERE id LIKE ?', id, (err, results) => {
            if (err) {
                console.error('Không thể xóa người dùng:', err);
                res.status(500).send('Không thể xóa người dùng');
                return;
            }
            
            db.query(alterTableQuery, (err) => {
                if (err) {
                    console.error('Không thể cập nhật AUTO_INCREMENT:', err);
                    res.status(500).send('Không thể cập nhật AUTO_INCREMENT');
                    return;
                }
                    res.status(200).json(results);
            });
                });
                db.release(); 

    },
};