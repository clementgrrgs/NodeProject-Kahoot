const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


module.exports = (io) => {

    router.get('/show', (req, res, next) => {
        mongoose.model('Quizz').find({}, (err, result) => {
            if (err) return console.log(err);
            res.render('quizz/show', {
                quizzs: result,
                user: req.user
            });
        });
    });

    router.get('/create', (req, res, next) => {
        res.render('quizz/create', {
            user: req.user
        });
    });

    router.post('/create', (req, res, next) => {
        mongoose.model('Quizz').count(function (err, count) {
            if (err) {
                console.log(err);
            } else {
                req.body.pin = count + 1;
                mongoose.model('Quizz').create(req.body, (err, item) => {
                    if (err) {
                        res.send(err);
                    } else {

                        res.redirect('/quizz/show');
                    }
                });
            }
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

    router.get('/run/:id', (req, res, next) => {
        mongoose.model('Quizz').findByIdAndUpdate(req.params.id, {
            launch: true
        }, (err, items) => {
            var arrayPlayer = [];

            const Namespace = io.of('/quizz' + items.pin);

            Namespace.on('connection', function (socket) {
                socket.emit('MessageConnection', 'Connected');
            });

            Namespace.on('Eventpseudo', (pseudo) => {
                console.log("Catch on Pseudo OK");
                arrayPlayer.push(pseudo);
                console.log(arrayPlayer);
                mongoose.model('Quizz').findByIdAndUpdate(req.params.id, arrayPlayer, (err, item) => {
                    if (err) {
                        res.send(err);
                    } else {
                        res.render("quizz/run", {
                            quizz: item
                        });
                    }
                });
            });


            res.render("quizz/run", {
                quizz: items
            });
        });
    });


    return router;
}