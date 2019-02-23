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

    router.get('/run/:id', (req, res) => {
        mongoose.model('Quizz').findByIdAndUpdate(req.params.id, {
            launch: true
        }, (err, items) => {
            const Namespace = io.of('/quizz' + items.pin);
            var arrayPlayer = [];
            var iIndexQuestion = 0;
            var winner = {
                pseudo : "",
                score : 0
            };
            Namespace.on('connection', function (socket) {
                console.log("client Connected");
                socket.emit('ackConnection','OK');

                socket.on('Eventpseudo', function (pseudoSocket){
                    arrayPlayer.push(pseudoSocket);
                    socket.emit('Players',arrayPlayer);
                    socket.broadcast.emit('Players',arrayPlayer);
                });

                socket.on('begin', function (oResp){
                    mongoose.model('Quizz').findByIdAndUpdate(req.params.id, {player : oResp.players}, (err,item) => {
                        if (err){
                            console.log(err);
                        }else{
                            iIndexQuestion = 0;
                            socket.emit('go', item.duration);
                            socket.broadcast.emit('go', item.duration);

                            var IntQuest = setInterval(() => {
                                socket.emit('question', {quest : item.questions[iIndexQuestion], time : item.duration});
                                socket.broadcast.emit('question', {quest : item.questions[iIndexQuestion], time : item.duration});
                                iIndexQuestion ++;

                                if (iIndexQuestion > item.questions.length-1){
                                    clearInterval(IntQuest);
                                    setTimeout(() => {
                                        socket.broadcast.emit("quizzDone");
                                    }, item.duration*1000);
                                }
                            }, item.duration*1000);
                        }     
                    });
                });

                socket.on('response', function (Response) {
                    mongoose.model('Quizz').findById(req.params.id, (err, item) => {
                        if (err) {
                            console.log(err);
                        }else{
                            if (Response.resp == item.questions[iIndexQuestion-1].answer){
                                socket.emit('Correct',{text : 'This is a right Answer', pseudo : Response.pseudo});
                            }else{
                                socket.emit('Correct',{text : 'This is not the right answer', pseudo : Response.pseudo});
                            }
                        }
                    });   
                });


                socket.on('result', (Response) => {
                    if(winner.score < Response.score){
                        winner.score = Response.score;
                        winner.pseudo = Response.name;
                    }else if (winner.score == Response.score){
                        if(winner.pseudo != Response.name){
                            winner.pseudo += " - "+Response.name;
                        }
                    }
                    socket.broadcast.emit("winner", {winner : winner});
                });



            });
            
            res.render("quizz/run", {
                quizz: items
            });
        });
    });

    return router;
}