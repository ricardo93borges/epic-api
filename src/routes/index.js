module.exports = function (app, router) {

    //Middlewares
    app.use(function(req, res, next) {
        console.log('-------- MY MIDDLEWARE --------');
        next(); 
    });

    //Routes
    app.use('/', require('./users')(router))
    app.use('/', require('./posts')(router))

    return app
}