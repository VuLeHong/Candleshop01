const db = require('../config/db');

module.exports = {
    getAll: function (req, res) {
        db.query('SELECT * FROM Users', (err, results) => {
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
        db.query('SELECT * FROM Users WHERE id = ?', [id], (err, results) => {
            if (err) {
              console.error('Không thể lấy dữ liệu từ MySQL:', err);
              res.status(500).send('Không thể lấy dữ liệu từ MySQL');
              return;
            }
            res.json(results);
          });
    },
    logIn: function (req, res) {
        const {gmail, password} = req.body;
        db.query('SELECT GMAIL, PASSWORD, IsAdmin FROM Users WHERE GMAIL LIKE ?', gmail, (err, results) => {
        if (err) {
            console.error('Không thể lấy dữ liệu từ MySQL:', err);
            res.status(500).send('lỗi hệ thống');
            //return;
        }
        else{
        
            if(results.length>0) { 
                if(results[0].PASSWORD==password) res.status(200).json(results[0].IsAdmin)
                else res.status(202).json(results)
            }
            else {
            res.status(204).send('ng dung ko ton tai');
            }
        }
        
        });
    },
    signUp: function (req, res) {
        const {gmail: gmail, password: password} = req.body;
        const today = new Date();
        const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        db.query('INSERT INTO Users (gmail, password, created_at) VALUES (?, ?, ?)', [gmail, password, date], (err, results) => {
        if (err) {
            console.error('Không thể lấy dữ liệu từ MySQL:', err);
            res.status(500).send('Không thể lấy dữ liệu từ MySQL');
            return;
        }
        res.status(200).json(results);
        });
    },
    
    updatePassword: function (req, res) {
        const {gmail: gmail, password: password} = req.body;
        db.query('UPDATE Users SET password = ? WHERE GMAIL LIKE ?',[password, gmail], (err, results) => {
        if (err) {
            console.error('Không thể lấy dữ liệu từ MySQL:', err);
            res.status(500).send('Không thể lấy dữ liệu từ MySQL');
            return;
        }
        res.status(200).json(results);
        });
    },
    deleteOne: function (req, res) {
        const {gmail: gmail} = req.body;
        db.query('SELECT User_id FROM Users WHERE GMAIL LIKE ?', [gmail], (err, results) => {
        if (err) {
            console.error('Không thể lấy dữ liệu từ MySQL:', err);
            res.status(500).send('Không thể lấy dữ liệu từ MySQL');
            return;
        }
        if (results.length === 0) {
            res.status(404).send('User not found');
            return;
        }
        const userId = results[0].User_id;
            const newAutoIncrementValue = userId - 1;
            const alterTableQuery = `ALTER TABLE Users AUTO_INCREMENT = ${newAutoIncrementValue}`;
        db.query('DELETE FROM Users WHERE GMAIL LIKE ?', [gmail], (err, results) => {
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