const pool = require('../config/db');
const multer = require('multer');
const mysql = require('mysql2');

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
  getAll: async function (req, res) {
    let db;
    try {
      db = await pool.getConnection();
      const [results] = await db.query('SELECT * FROM Product');
      res.json(results);
    } catch (err) {
      console.error('Không thể lấy dữ liệu từ MySQL:', err);
      res.status(500).send('Không thể lấy dữ liệu từ MySQL');
    } finally {
      if (db) db.release();
    }
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
  getOne: async function (req, res) {
    let db;
    try {
      db = await pool.getConnection();
      const id = req.params.id || '';
      const [results] = await db.query('SELECT * FROM Product WHERE id = ?', [id]);
      res.json(results);
    } catch (err) {
      console.error('Không thể lấy dữ liệu từ MySQL:', err);
      res.status(500).send('Không thể lấy dữ liệu từ MySQL');
    } finally {
      if (db) db.release();
    }
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
  getImage: async function (req, res) {
    let db;
    try {
      db = await pool.getConnection();
      const id = req.params.id || '';
      const [results] = await db.query('SELECT Image FROM Product WHERE id LIKE ?', [id]);

      if (results.length > 0 && results[0].Image) {
        const imageBuffer = results[0].Image;
        res.setHeader('Content-Type', 'image/jpeg');
        res.send(imageBuffer);
      } else {
        res.status(404).send('Image not found');
      }
    } catch (err) {
      console.error('Không thể lấy dữ liệu từ MySQL:', err);
      res.status(500).send('Không thể lấy dữ liệu từ MySQL');
    } finally {
      if (db) db.release();
    }
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
  getId: async function (req, res) {
    let db;
    try {
      db = await pool.getConnection();
      const { Name } = req.body;
      const [results] = await db.query('SELECT id FROM Product WHERE Name LIKE ?', [Name]);
      res.json(results);
    } catch (err) {
      console.error('Không thể lấy dữ liệu từ MySQL:', err);
      res.status(500).send('Không thể lấy dữ liệu từ MySQL');
    } finally {
      if (db) db.release();
    }
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
  createOne: async function (req, res) {
    let db;
    try {
      db = await pool.getConnection();
      const { name, quantity, desc, price, category_id, detail } = req.body;
      const today = new Date();
      const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
      const [results] = await db.query(
        'INSERT INTO Product (Name, Quantity, `Desc`, Price, Category_id, Detail, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [name, quantity, desc, price, category_id, detail, date]
      );
      res.status(200).json(results);
    } catch (err) {
      console.error('Không thể lấy dữ liệu từ MySQL:', err);
      res.status(500).send('Không thể lấy dữ liệu từ MySQL');
    } finally {
      if (db) db.release();
    }
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
  updateImage: async function (req, res) {
    let db;
    try {
      db = await pool.getConnection();
      if (!req.file || !req.file.buffer) {
        return res.status(400).send('No file uploaded or file data is missing');
      }
      const photo = req.file.buffer;
      const { Name } = req.body;
      const [results] = await db.query('UPDATE Product SET Image = ? WHERE Name = ?', [photo, Name]);
      res.status(200).json(results);
    } catch (err) {
      console.error('Error updating image in MySQL:', err);
      res.status(500).send('Error updating image in MySQL');
    } finally {
      if (db) db.release();
    }
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
  updateDiscount: async function (req, res) {
    let db;
    try {
      db = await pool.getConnection();
      const { Name, Discount } = req.body;
      const [results] = await db.query('UPDATE Product SET Discount = ? WHERE Name LIKE ?', [Discount, Name]);
      res.status(200).json(results);
    } catch (err) {
      console.error('Không thể lấy dữ liệu từ MySQL:', err);
      res.status(500).send('Không thể lấy dữ liệu từ MySQL');
    } finally {
      if (db) db.release();
    }
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
  deleteOne: async function (req, res) {
    let db;
    try {
      db = await pool.getConnection();
      const id = req.params.id || '';
      const [results] = await db.query('DELETE FROM Product WHERE id LIKE ?', [id]);

      const newAutoIncrementValue = id - 1;
      const alterTableQuery = `ALTER TABLE Product AUTO_INCREMENT = ${newAutoIncrementValue}`;

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