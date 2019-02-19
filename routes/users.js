const express = require('express');
const router = express.Router();
const passport = require('passport');

require('../passport/google-strategy')(passport);


router.get('/login', (req,res,next) => {
        res.render('users/login');
});


router.post('/login',passport.authenticate('google', {
    scope: ['profile'],
    failureRedirect:'/error'
}),(req,res,next) => {
    res.redirect('/');
});


router.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    function(req, res) {
    res.redirect('/');
});

router.get('/logout', (req,res,next) => {
    req.logout();
    res.redirect('/');
});


module.exports = router;

