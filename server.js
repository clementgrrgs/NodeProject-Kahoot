//npm run dev   ==>  Run the application
//https://mlab.com/databases/quiz/collections/quiz   ===> see database


const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.use(express.static('public'));

MongoClient.connect('mongodb://clement:pl0pgl0p@ds135255.mlab.com:35255/quiz', (err,client) => {
    if (err) return console.log(err);
    db = client.db('quiz');

    app.listen(3000, () => {
        console.log('listening on 3000');
    });
});


app.get('/', (req,res) => {
    db.collection('quiz').find().toArray((err,result) => {
        if (err) return console.log(err);

        res.render('index.ejs',{quiz: result});
    });
});

app.post('/quiz', (req,res) => {
    db.collection('quiz').save(req.body, (err,result) => {
        if (err) return console.log(err);

        console.log('saved to db');
        res.redirect('/');
    });
});


app.put('/quiz', (req, res) => {
    db.collection('quiz').findOneAndUpdate(
        {name: 'Hazy Diamond'},
        {$set: {
            name: req.body.name,
            quote: req.body.quote
        }},
        {sort: {_id:-1},
               upsert: true
        },
        (err, result) => {
            if (err) return res.send(err);
            res.send(result);
        }
    );
  });

  app.delete('/quiz', (req, res) => {
    db.collection('quiz').findOneAndDelete({name: req.body.name},
        (err, result) => {
          if (err) return res.send(500, err)
          res.send({message: 'A darth vadar quote got deleted'})
        }
    );
  });