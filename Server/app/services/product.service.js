const db =require('../config/db');
const multer = require('multer');

module.exports = {
  /**
 * @api {get} /product Request AllProducts information
 * @apiName GetAllProducts
 * @apiGroup Product
 *
 * @apiSuccess {Array} all products.
 *
 * @apiError Không thể lấy dữ liệu từ MySQL.
 */
    getAll: function (req, res) {
        db.query('SELECT * FROM Product', (err, results) => {
            if (err) {
              console.error('Không thể lấy dữ liệu từ MySQL:', err);
              res.status(500).send('Không thể lấy dữ liệu từ MySQL');
              return;
            }
            res.json(results);
          });
    },

    /**
 * @api {get} /product/:id Request Product information
 * @apiName GetProduct
 * @apiGroup Product
 *
 * @apiParam {Number} id Products unique ID.
 *
 * @apiSuccess {Object} all information of this product.
 *
 * @apiError Không thể lấy dữ liệu từ MySQL.
 */

    getOne: function (req, res) {
        let id = req.params.id || '';
        db.query('SELECT * FROM Product WHERE id = ?', [id], (err, results) => {
            if (err) {
              console.error('Không thể lấy dữ liệu từ MySQL:', err);
              res.status(500).send('Không thể lấy dữ liệu từ MySQL');
              return;
            }
            res.json(results);
          });
    },

/**
 * @api {get} /product_image/:id Request Product image
 * @apiName GetProductImage
 * @apiGroup Product
 *
 * @apiParam {Number} id Product unique ID.
 *
 * @apiSuccess {Blob} image of the Product.
 *
 * @apiError Không thể lấy dữ liệu từ MySQL.
 */

    getImage: function (req, res) {
        let id = req.params.id || '';
        db.query('SELECT Image FROM Product WHERE id LIKE ?', [id],(err, results) => {
          if (err) {
            console.error('Không thể lấy dữ liệu từ MySQL:', err);
            res.status(500).send('Không thể lấy dữ liệu từ MySQL');
            return;
          }
          if (results.length > 0 && results[0].Image) {
            const imageBuffer = results[0].Image;
            res.setHeader('Content-Type', 'image/jpeg');
            res.send(imageBuffer);
          } else {
            res.status(404).send('Image not found');
          }
          
        });
    },

/**
 * @api {get} /users/:id Request User information
 * @apiName GetUser
 * @apiGroup User
 *
 * @apiParam {Number} id Users unique ID.
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 *
 * @apiError UserNotFound The id of the User was not found.
 */

    getId: function (req, res) {
        const {Name: Name} = req.body;
        db.query('SELECT id FROM Product WHERE Name LIKE ?', Name,(err, results) => {
            if (err) {
            console.error('Không thể lấy dữ liệu từ MySQL:', err);
            res.status(500).send('Không thể lấy dữ liệu từ MySQL');
            return;
            }
            res.json(results);
        });
    },

/**
 * @api {post} /product Create new product
 * @apiName PostProduct
 * @apiGroup Product
 *
 * @apiSuccess {Object} created product.
 *
 * @apiError Không thể lấy dữ liệu từ MySQL.
 */

    createOne: function (req, res) {
        const {name: name, quantity: quantity, desc: desc, price: price, category_id: category_id, detail: detail} = req.body;
        const today = new Date();
        const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        db.query('INSERT INTO Product (Name, Quantity, `Desc`, Price, Category_id, Detail, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)', [name, quantity, desc, price, category_id, detail, date], (err, results) => {
            if (err) {
            console.error('Không thể lấy dữ liệu từ MySQL:', err);
            res.status(500).send('Không thể lấy dữ liệu từ MySQL');
            return;
            }
            res.status(200).json(results);
        });
    },

    /**
 * @api {put} /product_image Update image of Product
 * @apiName PutImageProduct
 * @apiGroup Product
 *
 * @apiSuccess {Blob} new image of product.
 *
 * @apiError Error updating image in MySQL.
 */

    updateImage: function (req, res) {
        if (!req.file || !req.file.buffer) {
            return res.status(400).send('No file uploaded or file data is missing');
        }
        const photo = req.file.buffer;
        const {Name:Name} = req.body;
        db.query('UPDATE Product SET Image = ? WHERE Name = ?', [photo, Name], (err, results) => {
            if (err) {
              console.error('Error updating image in MySQL:', err);
              return res.status(500).send('Error updating image in MySQL');
            }
            res.status(200).json(results);
          });
    },

/**
 * @api {put} /product_discount Create a discount of product
 * @apiName PutDiscountProduct
 * @apiGroup Product
 *
 * @apiSuccess {Number} value of discount.
 *
 * @apiError Không thể lấy dữ liệu từ MySQL.
 */

    updateDiscount: function (req, res) {
        const {Name: Name, Discount: Discount} = req.body;
        db.query('UPDATE Product SET Discount = ? WHERE Name LIKE ?',[Name, Discount], (err, results) => {
            if (err) {
            console.error('Không thể lấy dữ liệu từ MySQL:', err);
            res.status(500).send('Không thể lấy dữ liệu từ MySQL');
            return;
            }
            res.status(200).json(results);
        });
    },

/**
 * @api {delete} /product/:id Delete product
 * @apiName DeleteProduct
 * @apiGroup Product
 *
 * @apiParam {Number} id Products unique ID.
 *
 * @apiSuccess {String} delete successful.
 *
 * @apiError Không thể xóa người dùng.
 */

    deleteOne: function (req, res) {
        let id = req.params.id || '';
        const productId = id;
        const newAutoIncrementValue = productId - 1;
        const alterTableQuery = `ALTER TABLE Product AUTO_INCREMENT = ${newAutoIncrementValue}`;
            db.query('DELETE FROM Product WHERE id LIKE ?', [id], (err, results) => {
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