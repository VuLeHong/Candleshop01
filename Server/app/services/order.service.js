const db =require('../config/db');
const mysql = require('mysql2');
module.exports = {
    getAll: async function (req, res) {
        const db = await pool.getConnection();
        db.query('SELECT * FROM Orders', (err, results) => {
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
        db.query('SELECT * FROM Orders WHERE id = ?', [id], (err, results) => {
            if (err) {
              console.error('Không thể lấy dữ liệu từ MySQL:', err);
              res.status(500).send('Không thể lấy dữ liệu từ MySQL');
              return;
            }
            res.json(results);
          });
          db.release(); 
    },
    updateItem: async function (req, res) {
        const db = await pool.getConnection();
        let Order_id = req.params.id || '';
        const { Cart_items: Cart_items} = req.body; 
    
        try {
            Cart_items.forEach((item) => {
                const Product_id = item.id;
                const Quantity = item.Quantity;
    
                db.query('INSERT INTO Order_item (Order_id, Product_id, Quantity) VALUES (?, ?, ?)', [Order_id, Product_id, Quantity], (error, results) => {
                    if (error) {
                        console.error('Error inserting into MySQL:', error);
                        res.status(500).send('Error inserting into MySQL');
                        return;
                    }
                });
            });
    
            res.status(200).json({ message: 'Items updated successfully' });
    
        } catch (error) {
            console.error('Không thể lấy dữ liệu từ MySQL:', error);
            res.status(500).send('Không thể lấy dữ liệu từ MySQL');
        }
        db.release();
    },


    createOne: async function (req, res) {
        const db = await pool.getConnection();
        const {User_name: User_name, Gmail: Gmail, Phone_Number: Phone_Number, Address: Address, Amount: Amount} = req.body;
        const today = new Date();
        const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        try {
            db.query('INSERT INTO Orders (User_name, Gmail, Phone_Number, Address, AMount, created_at) VALUES (?, ?, ?, ?, ?, ?)', [User_name, Gmail, Phone_Number, Address, Amount, date], (err,results) =>{
                if (err) {
                    console.error('Không thể lấy dữ liệu từ MySQL:', err);
                    res.status(500).send('Không thể lấy dữ liệu từ MySQL');
                    return;
                    }
                res.status(200).json(results.insertId);
            })
        } catch (error) {
            console.error('Không thể lấy dữ liệu từ MySQL:', error);
            res.status(500).send('Không thể lấy dữ liệu từ MySQL');
        }
        db.release();
    },
    
    deleteOne: async function (req, res) {
        const db = await pool.getConnection();
        let id = req.params.id || '';
        const newAutoIncrementValue = id - 1;
        const alterTableQuery = `ALTER TABLE Orders AUTO_INCREMENT = ${newAutoIncrementValue}`;
        db.query('DELETE FROM Orders WHERE id LIKE ?', [id], (err, results) => {
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