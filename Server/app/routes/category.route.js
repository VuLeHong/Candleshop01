// our components
const categoryService = require('../services/category.service');

const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
module.exports = function (app) {
    //api
    app.get('/api/v1/category', categoryService.getAll);
    app.get('/api/v1/category/:id', categoryService.getOne);
    app.post('/api/v1/category', categoryService.createOne);
    app.put('/api/v1/category', categoryService.updateOne);
    app.delete('/api/v1/category', categoryService.deleteOne)
};
