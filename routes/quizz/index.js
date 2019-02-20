const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


module.exports = (io) => {

    router.get('/show', (req,res,next) => {
        mongoose.model('Quizz').find({}, (err, result) => {
            if (err) return console.log(err);
            res.render('quizz/show', {quizzs: result, user: req.user});
        });
    });

    router.get('/create', (req, res, next) => {
        res.render('quizz/create', {
            user: req.user
        });
    });

    router.post('/create', (req, res, next) => {
        mongoose.model('Quizz').create(req.body, (err, item) => {
            if (err)
                res.send(err);
            else
            //io.sockets.emit('new quizz', `${req.user.username} created a new quizz : ${item.name}`);
            
            res.redirect('/quizz/show');
        });
    });


    router.get('/edit/:id', (req, res, next) => {
        mongoose.model('Quizz').findById(req.params.id, (err, item) => {
            res.render('quizz/edit', {
                quizz: item, 
                user: req.user
            });
        });
    });


    router.post('/edit/:id', (req, res, next) => {
        mongoose.model('Quizz').findByIdAndUpdate(req.params.id, req.body, (err, item) => {
            if (err)
                res.send(err);
            else
                res.redirect('/quizz/show');
        });
    });


    router.get('/delete/:id', (req, res, next) => {
        mongoose.model('Quizz').findByIdAndDelete(req.params.id, (err, item) => {
            if (err)
                res.send(err);
            else
                res.redirect('/quizz/show');
        });
    });

    return router;
}