// our components
const orderService = require('../services/order.service');


module.exports = function (app) {
    //api
    app.get('/api/v1/order', orderService.getAll);
    app.get('/api/v1/order/:id', orderService.getOne);
    app.post('/api/v1/order', orderService.createOne);
    app.put('/api/v1/order/:id', orderService.updateItem);
    app.delete('/api/v1/order/:id', orderService.deleteOne);
    
};
