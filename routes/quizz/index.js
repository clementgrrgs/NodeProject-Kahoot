const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


module.exports = (io) => {

    router.get('/create', (req,res,next) => {
            res.render('quizz/create',{nbQuestion : 5});
    });

    router.post('/create', (req,res,next) => {
            mongoose.model('Quizz').create(req.body, (err,item) => {
                if(err)
                    res.send(err);
                else
                    io.sockets.emit('new quizz', `${req.user.username} created a new quizz : ${item.name}`);
                    res.redirect('/');
            });
    });
    

    router.get('/edit/:id', (req,res,next) => {
        mongoose.model('Quizz').findById(req.params.id, (err,item) => {
            res.render('quizz/edit', {
                quizz: item
            });
        });
    });


    router.post('/edit/:id', (req,res,next) => {
        mongoose.model('Quizz').findByIdAndUpdate(req.params.id, req.body, (err,item) => {
            if (err)
                res.send(err);
            else
                res.redirect('/');
        });
    });
    

    router.get('/delete/:id', (req,res,next) => {
        mongoose.model('Quizz').findById(req.params.id, (err,item) => {
            res.render('quizz/edit', {
                quizz: item
            });
        });
    });


    router.post('/delete/:id', (req,res,next) => {
        mongoose.model('Quizz').findByIdAndDelete(req.params.id, (err,item) => {
            if(err)
                res.send(err);
            else
                res.redirect('/');
        });
    });

    return router;
}