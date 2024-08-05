// our components
const userService = require('../services/user.service');

module.exports = function (app) {
    //api
    app.get('/api/v1/user', userService.getAll);
    app.get('/api/v1/user/:id', userService.getOne);
    app.post('/api/v1/user_login', userService.logIn);
    app.post('/api/v1/user_signup', userService.signUp);
    app.put('/api/v1/user', userService.updatePassword);
    app.put('/api/v1/user/:id', userService.updateAdmin);
    app.delete('/api/v1/user/:id', userService.deleteOne);
    
};
