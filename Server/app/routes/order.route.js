// our components
const orderService = require('../services/order.service');
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
module.exports = function (app) {
    //api
    app.get('/api/v1/order', orderService.getAll);
    app.get('/api/v1/order/:id', orderService.getOne);
    app.post('/api/v1/order', orderService.createOne);
    app.post('/api/v1/order_payment/:id', orderService.createPayment);
    app.put('/api/v1/order/:id', orderService.updateItem);
    app.delete('/api/v1/order', orderService.deleteOne);
    
};
