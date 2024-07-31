const db =require('../config/db');
module.exports = {
    getAll: function (req, res) {
        db.query('SELECT * FROM Category', (err, results) => {
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
        db.query('SELECT * FROM Category WHERE id = ?', [id], (err, results) => {
            if (err) {
              console.error('Không thể lấy dữ liệu từ MySQL:', err);
              res.status(500).send('Không thể lấy dữ liệu từ MySQL');
              return;
            }
            res.json(results);
          });
    },
    createOne: function (req, res) {
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
    },
    updateOne: function (req, res) {
        const {Name: Name, Desc: Desc} = req.body;
        db.query('UPDATE Category SET `Desc` = ? WHERE Name LIKE ?',[Desc, Name], (err, results) => {
            if (err) {
            console.error('Không thể lấy dữ liệu từ MySQL:', err);
            res.status(500).send('Không thể lấy dữ liệu từ MySQL');
            return;
            }
            res.status(200).json(results);
        });
    },
    deleteOne: function (req, res) {
        const {Name: Name} = req.body;
        db.query('SELECT id FROM Category WHERE Name LIKE ?', [Name], (err, results) => {
            if (err) {
                console.error('Không thể lấy dữ liệu từ MySQL:', err);
                res.status(500).send('Không thể lấy dữ liệu từ MySQL');
                return;
            }
            if (results.length === 0) {
                res.status(404).send('User not found');
                return;
            }
            const categoryId = results[0].id;
            const newAutoIncrementValue = categoryId - 1;
            const alterTableQuery = `ALTER TABLE Category AUTO_INCREMENT = ${newAutoIncrementValue}`;
            db.query('DELETE FROM Category WHERE Name LIKE ?', [Name], (err, results) => {
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
        });
    },
};