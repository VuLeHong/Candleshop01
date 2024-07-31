// our components
const productService = require('../services/product.service');
const upload = require('../config/uploadImage')
module.exports = function (app) {
    //api
    app.get('/api/v1/product', productService.getAll);
    app.get('/api/v1/product/:id', productService.getOne);
    app.get('/api/v1/product_image/:id', productService.getImage);
    app.post('/api/v1/product', productService.createOne);
    app.put('/api/v1/product_image', upload.single('photo'), productService.updateImage);
    app.put('/api/v1/product_discount', productService.updateDiscount);
    app.delete('/api/v1/product', productService.deleteOne);
    
};
