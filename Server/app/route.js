module.exports = function (app) {
    require('./routes/product.route')(app);
    require('./routes/user.route')(app);
    require('./routes/category.route')(app);
    require('./routes/order.route')(app);
};