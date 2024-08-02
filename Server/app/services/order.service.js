const db =require('../config/db');

module.exports = {
    getAll: function (req, res) {
        db.query('SELECT * FROM Orders', (err, results) => {
            if (err) {
              console.error('Không thể lấy dữ liệu từ MySQL:', err);
              res.status(500).send('Không thể lấy dữ liệu từ MySQL');
              return;
            }
            res.json(results);
          });
    },

    getOne: function (req, res) {
        let id = req.params.id || '';
        db.query('SELECT * FROM Orders WHERE id = ?', [id], (err, results) => {
            if (err) {
              console.error('Không thể lấy dữ liệu từ MySQL:', err);
              res.status(500).send('Không thể lấy dữ liệu từ MySQL');
              return;
            }
            res.json(results);
          });
    },
    updateItem: function (req, res) {
        let Order_id = req.params.id || '';
        const {Cart_items: Cart_items} = req.body;
        try {
            for(let item of Cart_items){
                const Product_id = item.id;
                const Quantity = item.quantity
                db.query('INSERT INTO Order_item (Order_id, Product_id, Quantity) VALUES (?, ?, ?)', [Order_id, Product_id, Quantity], (results) => {
                    
                    res.status(200).json(results);
                });
            } 
        } catch (error) {
            console.error('Không thể lấy dữ liệu từ MySQL:', err);
            res.status(500).send('Không thể lấy dữ liệu từ MySQL');
        }
        
        
    },
    createPayment: function (req, res) {
        let Order_id = req.params.id || '';
        const {Amount: Amount} = req.body;
        const today = new Date();
        const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        try {
            db.query('INSERT INTO Payment (Order_id, Amount, Create_at) VALUES (?, ?, ?)', [Order_id, Amount, date], (results) => {
                const payment_id = results.insertId;
                db.query('UPDATE Orders SET Payment_id = ? WHERE id LIKE ?', [payment_id, Order_id], (results) => {
                    res.status(200).json(results);
                })
            })
        } catch (error) {
            console.error('Không thể lấy dữ liệu từ MySQL:', err);
            res.status(500).send('Không thể lấy dữ liệu từ MySQL');
        }
        
        
    },
    createOne: function (req, res) {
        const {User_name: User_name, Gmail: Gmail, Phone_Number: Phone_Number, Address: Address} = req.body;
        const today = new Date();
        const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        try {
            db.query('INSERT INTO Orders (User_name, Gmail, Phone_Number, Address, created_at) VALUES (?, ?, ?, ?, ?)', [User_name, Gmail, Phone_Number, Address, date], (err,results) =>{
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
    },
    
    deleteOne: function (req, res) {
        const {id: id} = req.body;
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
    },
};