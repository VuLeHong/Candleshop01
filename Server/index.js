const express = require('express');
const mysql = require('mysql2');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
const app = express();
const multer = require('multer');

app.use(express.json());
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
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
  //get all users//tested
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
  // user delete//tested
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
  //user adjust
  app.post('/update_user', (req, res) => {
    const {gmail: gmail, password: password} = req.body;
    db.query('UPDARTE Users SET password = ? WHERE GMAIL LIKE ?',[password, gmail], (err, results) => {
      if (err) {
        console.error('Không thể lấy dữ liệu từ MySQL:', err);
        res.status(500).send('Không thể lấy dữ liệu từ MySQL');
        return;
      }
      res.status(200).json(results);
    });
  });
  //user sign up//tested
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
  // //user log in//tested
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
// category add//tested
app.post('/categoryadd', (req, res) => {
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
});
//showallcategory//tested
app.get('/showcategory', (req, res) => {
  db.query('SELECT * FROM Category', (err, results) => {
    if (err) {
      console.error('Không thể lấy dữ liệu từ MySQL:', err);
      res.status(500).send('Không thể lấy dữ liệu từ MySQL');
      return;
    }
    res.json(results);
  });
});
//category adjust//tested
app.post('/update_category', (req, res) => {
  const {Name: Name, Desc: Desc} = req.body;
  db.query('UPDATE Category SET `Desc` = ? WHERE Name LIKE ?',[Desc, Name], (err, results) => {
    if (err) {
      console.error('Không thể lấy dữ liệu từ MySQL:', err);
      res.status(500).send('Không thể lấy dữ liệu từ MySQL');
      return;
    }
    res.status(200).json(results);
  });
});
// Discount_add
app.post('/discount_add', (req, res) => {
  const {Name: Name, Discount: Discount} = req.body;
  db.query('UPDARTE Product SET Discount = ? WHERE Name LIKE ?',[Name, Discount], (err, results) => {
    if (err) {
      console.error('Không thể lấy dữ liệu từ MySQL:', err);
      res.status(500).send('Không thể lấy dữ liệu từ MySQL');
      return;
    }
    res.status(200).json(results);
  });
});
//get_all_product//tested
app.get('/showproduct', (req, res) => {
  db.query('SELECT * FROM Product', (err, results) => {
    if (err) {
      console.error('Không thể lấy dữ liệu từ MySQL:', err);
      res.status(500).send('Không thể lấy dữ liệu từ MySQL');
      return;
    }
    res.json(results);
  });
});
//get_image_by_id//tested
app.post('/getimage', (req, res) => {
  const {id:id} = req.body
  db.query('SELECT Image FROM Product WHERE id LIKE ?', [id],(err, results) => {
    if (err) {
      console.error('Không thể lấy dữ liệu từ MySQL:', err);
      res.status(500).send('Không thể lấy dữ liệu từ MySQL');
      return;
    }
    if (results.length > 0 && results[0].Image) {
      const imageBuffer = results[0].Image;
      const filePath = path.join(__dirname, `${id}.jpg`);
      
      fs.writeFile(filePath, imageBuffer, 'binary', (err) => {
        if (err) {
          console.error('Cannot write image to file:', err);
          res.status(500).send('Cannot write image to file');
          return;
        }
        res.status(200).sendFile(filePath);
      });
    } else {
      res.status(404).send('Image not found');
    }
    
    //res.json(filePath);
  });
})
//product add//tested
app.post('/productadd', (req, res) => {
  const {Name: Name, Quantity: Quantity, Desc: Desc, Price: Price, Category_id: Category_id, Detail: Detail} = req.body;
  const today = new Date();
  const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  db.query('INSERT INTO Product (Name, Quantity, `Desc`, Price, Category_id, Detail, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)', [Name, Quantity, Desc, Price, Category_id, Detail, date], (err, results) => {
    if (err) {
      console.error('Không thể lấy dữ liệu từ MySQL:', err);
      res.status(500).send('Không thể lấy dữ liệu từ MySQL');
      return;
    }
    res.status(200).json(results);
  });
});
// product add image//tested
app.post('/imageadd', upload.single('photo'), (req, res) => {
  const photo = req.file.buffer;
  const {Name:Name} = req.body;
  db.query('UPDATE Product SET Image = ? WHERE Name LIKE ?', [photo, Name], (err, results) => {
    if (err) {
      console.error('Không thể lấy dữ liệu từ MySQL:', err);
      res.status(500).send('Không thể lấy dữ liệu từ MySQL');
      return;
    }
    res.status(200).json(results);
  });
});
//get_product_id
app.get('/getpid', (req, res) => {
  const {Name: Name} = req.body;
  db.query('SELECT id FROM Product WHERE Name LIKE ?', Name,(err, results) => {
    if (err) {
      console.error('Không thể lấy dữ liệu từ MySQL:', err);
      res.status(500).send('Không thể lấy dữ liệu từ MySQL');
      return;
    }
    res.json(results);
  });
});
//create order
app.post('/order_create', (req, res) => {
  const {User_name: User_name, Gmail: Gmail, Phone_Number: Phone_Number, Address: Address} = req.body;
  const today = new Date();
  const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  db.query('INSERT INTO Orders (User_name, Gmail, Phone_Number, Address, created_at) VALUES (?, ?, ?, ?, ?)', [User_name, Gmail, Phone_Number, Address, date], (err, results) => {
    if (err) {
      console.error('Không thể lấy dữ liệu từ MySQL:', err);
      res.status(500).send('Không thể lấy dữ liệu từ MySQL');
      return;
    }
    res.status(200).json(results);
  });
});
// order_item_add
app.post('/order_item_add', (req, res) => {
  const {Order_id: Order_id, Product_id:Product_id} = req.body;
  db.query('INSERT INTO Order_item (Order_id, Product_id) VALUES (?, ?)', [Order_id, Product_id], (err, results) => {
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
