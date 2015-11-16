var express = require('express');
var router = express.Router();
var isAuthenticated = function (req, res, next) {
// if user is authenticated in the session, call the next() to call the next request handler
// Passport adds this method to request object. A middleware is allowed to add properties to
// request and response objects
if (req.isAuthenticated())
return next();
// if the user is not authenticated then redirect him to the login page
res.redirect('/');
}

module.exports = function(passport){
    /* Handle Login POST */
    /*router.post('/login', passport.authenticate('login', {
    successRedirect: '/home',
    failureRedirect: '/login',
    failureFlash : true
    }));*/
    router.post('/login',
        passport.authenticate('login'),
        function(req, res) {
            console.log('login function is started')
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
      /*res.redirect('/users/' + req.user.username);*/
    });
    /* Handle Registration POST */
    /*router.post('/signup', passport.authenticate('signup', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash : true
    }));*/
    router.post('/signup',
        passport.authenticate('signup'),
        function(req, res) {
            console.log('signup function is started')
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
      /*res.redirect('/users/' + req.user.username);*/
    });
    /* GET Home Page */
    router.get('/home', isAuthenticated, function(req, res){
    res.render('home', { user: req.user });
    });
    /* Handle Logout */
    router.get('/signout', function(req, res) {
    req.logout();
    res.redirect('/login');
    });
    return router;
}