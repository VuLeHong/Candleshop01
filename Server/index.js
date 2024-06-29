const express = require('express');
const mysql = require('mysql2');
const dotenv = require('dotenv');
const app = express();

app.use(express.json());
dotenv.config();
const PASS = process.env.PASS
const HOST = process.env.HOST
const USER = process.env.USER
const DATABASE = process.env.DATABASE
const db = mysql.createConnection({
    host: HOST, // hoặc địa chỉ IP của MySQL Server
    user: USER, // tài khoản MySQL của bạn
    password: PASS, // mật khẩu của bạn
    database: DATABASE // tên cơ sở dữ liệu bạn đã tạo
  });
//connect database
  db.connect((err) => {
    if (err) {
      console.error('Không thể kết nối đến MySQL:', err);
      return;
    }
    console.log('Đã kết nối đến MySQL');
  });
  //get all users
  app.get('/users', (req, res) => {
    db.query('SELECT * FROM Users', (err, results) => {
      if (err) {
        console.error('Không thể lấy dữ liệu từ MySQL:', err);
        res.status(500).send('Không thể lấy dữ liệu từ MySQL');
        return;
      }
      res.json(results);
    });
  });
  // user delete
  app.post('/delete_user', (req, res) => {
    const {gmail: gmail} = req.body;
    db.query('DELETE FROM Users WHERE GMAIL LIKE ?', gmail, (err, results) => {
      if (err) {
        console.error('Không thể lấy dữ liệu từ MySQL:', err);
        res.status(500).send('Không thể lấy dữ liệu từ MySQL');
        return;
      }
      res.status(200).json(results);
    });
  });
  //user sign up
  app.post('/signup', (req, res) => {
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
  });
  // //user log in  
  app.post('/login', (req, res) => {
    const {gmail, password} = req.body;
    db.query('SELECT GMAIL, PASSWORD FROM USERS WHERE GMAIL LIKE ?', gmail, (err, results) => {
      if (err) {
        console.error('Không thể lấy dữ liệu từ MySQL:', err);
        res.status(500).send('Không thể lấy dữ liệu từ MySQL');
        return;
      }
      else{
        if(results) {
           if(results.password==password) res.status(200).json(results)
            else res.status(202).json(results)
        }
        else res.status(204).json(results)
      }
      
    });
  });
//product add
app.post('/productadd', (req, res) => {
  const {Name: Name, Quantity: Quantity, Desc: Desc, Price: Price, Discount_id: Discount_id, Category_id: Category_id, Detail: Detail} = req.body;
  const today = new Date();
  const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  db.query('INSERT INTO Product (Name, Quantity, Desc, Price, Discount_id, Category_id, Detail, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [Name, Quantity, Desc, Price, Discount_id, Category_id, Detail, date], (err, results) => {
    if (err) {
      console.error('Không thể lấy dữ liệu từ MySQL:', err);
      res.status(500).send('Không thể lấy dữ liệu từ MySQL');
      return;
    }
    res.status(200).json(results);
  });
});
// product add image
app.post('/imageadd', (req, res) => {
  const {photo:photo} = req.body;
  db.query('INSERT INTO Product (Image) VALUES (?)', photo, (err, results) => {
    if (err) {
      console.error('Không thể lấy dữ liệu từ MySQL:', err);
      res.status(500).send('Không thể lấy dữ liệu từ MySQL');
      return;
    }
    res.status(200).json(results);
  });
});
  //connect server
const PORT =process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
