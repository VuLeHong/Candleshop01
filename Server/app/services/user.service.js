const pool = require('../config/db');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = {
    getAll: async function (req, res) {
        const db = await pool.getConnection();
        db.query('SELECT * FROM Users', (err, results) => {
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
        db.query('SELECT * FROM Users WHERE id = ?', [id], (err, results) => {
            if (err) {
              console.error('Không thể lấy dữ liệu từ MySQL:', err);
              res.status(500).send('Không thể lấy dữ liệu từ MySQL');
              return;
            }
            res.json(results);
          });
          db.release();  
    },
    logIn: async function(req, res) {
        const db = await pool.getConnection();
        const {gmail, password} = req.body;
        db.query('SELECT GMAIL, PASSWORD, IsAdmin FROM Users WHERE GMAIL LIKE ?', gmail, (err, results) => {
        if (err) {
            console.error('Không thể lấy dữ liệu từ MySQL:', err);
            res.status(500).send('lỗi hệ thống');
            //return;
        }
        else{
            if(results.length>0) { 
                if(bcrypt.compare(password, results[0].PASSWORD)) res.status(200).json(results[0].IsAdmin)
                else res.status(202).json(results)
            }
            else {
            res.status(204).send('ng dung ko ton tai');
            }
        }
        
        });
        db.release();  
    },
    signUp: async function(req, res) {
        const db = await pool.getConnection();
        const {gmail: gmail, password: password} = req.body;
        const today = new Date();
        const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        const newpassword = await bcrypt.hash(password,saltRounds)
        db.query('INSERT INTO Users (gmail, password, created_at) VALUES (?, ?, ?)', [gmail, newpassword, date], (err, results) => {
        if (err) {
            console.error('Không thể lấy dữ liệu từ MySQL:', err);
            res.status(500).send('Không thể lấy dữ liệu từ MySQL');
            return;
        }
        res.status(200).json(results);
        });
        db.release();
    },
    updateAdmin: async function (req, res) {
        const db = await pool.getConnection();
        let id = req.params.id || '';
        db.query('UPDATE Users SET IsAdmin = 1 WHERE User_id LIKE ?',id, (err, results) => {
        if (err) {
            console.error('Không thể lấy dữ liệu từ MySQL:', err);
            res.status(500).send('Không thể lấy dữ liệu từ MySQL');
            return;
        }
        res.status(200).json(results);
        });
        db.release();
    },
    
    updatePassword: async function (req, res) {
        const db = await pool.getConnection();
        const {gmail: gmail, password: password} = req.body;
        db.query('UPDATE Users SET password = ? WHERE GMAIL LIKE ?',[password, gmail], (err, results) => {
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
        const userId = id;
            const newAutoIncrementValue = userId - 1;
            const alterTableQuery = `ALTER TABLE Users AUTO_INCREMENT = ${newAutoIncrementValue}`;
        db.query('DELETE FROM Users WHERE id LIKE ?', [id], (err, results) => {
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