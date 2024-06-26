const express = require('express');
const mysql = require('mysql2');
const dotenv = require('dotenv');
const app = express();

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

  db.connect((err) => {
    if (err) {
      console.error('Không thể kết nối đến MySQL:', err);
      return;
    }
    console.log('Đã kết nối đến MySQL');
  });

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const PORT =process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
