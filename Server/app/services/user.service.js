const pool = require('../config/db');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = {
    getAll: async function (req, res) {
        let db;
        try {
            db = await pool.getConnection();
            const [results] = await db.query('SELECT * FROM Users');
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
            const [results] = await db.query('SELECT * FROM Users WHERE id = ?', [id]);
            res.json(results);
        } catch (err) {
            console.error('Không thể lấy dữ liệu từ MySQL:', err);
            res.status(500).send('Không thể lấy dữ liệu từ MySQL');
        } finally {
            if (db) db.release();
        }
    },

    logIn: async function (req, res) {
        let db;
        try {
            db = await pool.getConnection();
            const { gmail, password } = req.body;
            const [results] = await db.query('SELECT GMAIL, PASSWORD, IsAdmin FROM Users WHERE GMAIL LIKE ?', [gmail]);

            if (results.length > 0) {
                const match = await bcrypt.compare(password, results[0].PASSWORD);
                if (match) {
                    res.status(200).json(results[0].IsAdmin);
                } else {
                    res.status(202).json({ message: 'Incorrect password' });
                }
            } else {
                res.status(204).send('User does not exist');
            }
        } catch (err) {
            console.error('Không thể lấy dữ liệu từ MySQL:', err);
            res.status(500).send('Lỗi hệ thống');
        } finally {
            if (db) db.release();
        }
    },

    signUp: async function (req, res) {
        let db;
        try {
            db = await pool.getConnection();
            const { gmail, password } = req.body;
            const today = new Date();
            const date = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            const [results] = await db.query('INSERT INTO Users (gmail, password, created_at) VALUES (?, ?, ?)', [gmail, hashedPassword, date]);
            res.status(200).json(results);
        } catch (err) {
            console.error('Không thể lấy dữ liệu từ MySQL:', err);
            res.status(500).send('Không thể lấy dữ liệu từ MySQL');
        } finally {
            if (db) db.release();
        }
    },

    updateAdmin: async function (req, res) {
        let db;
        try {
            db = await pool.getConnection();
            const id = req.params.id || '';
            const [results] = await db.query('UPDATE Users SET IsAdmin = 1 WHERE User_id LIKE ?', [id]);
            res.status(200).json(results);
        } catch (err) {
            console.error('Không thể lấy dữ liệu từ MySQL:', err);
            res.status(500).send('Không thể lấy dữ liệu từ MySQL');
        } finally {
            if (db) db.release();
        }
    },

    updatePassword: async function (req, res) {
        let db;
        try {
            db = await pool.getConnection();
            const { gmail, password } = req.body;
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            const [results] = await db.query('UPDATE Users SET password = ? WHERE GMAIL LIKE ?', [hashedPassword, gmail]);
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
            const [results] = await db.query('DELETE FROM Users WHERE id LIKE ?', [id]);

            const newAutoIncrementValue = id - 1;
            const alterTableQuery = `ALTER TABLE Users AUTO_INCREMENT = ${newAutoIncrementValue}`;

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
