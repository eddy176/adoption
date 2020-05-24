const express = require( 'express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
const app = express();
const port =  process.env.PORT || 3000;
const cors = require('cors');
var ObjectID = require('mongodb').ObjectID;

//change db to correct one!!
mongoose.connect('mongodb+srv://eddy:password1234@cluster0-odlqq.mongodb.net/midterm?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});

//5restful 
//create
//retrieve member
//retrieve collection
//delete
//list

//client and server side data validation
//deployed on heroku
//document in markdown(README)
//MIDDLEWARE
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("client"));


var Animal = mongoose.model('Animal', {
    animal: String,
    name: String,
    breed: String,
    age: Number,
    gender: String,
    color: String,
    description: String,
    scheduled: Boolean


});


app.get('/animals', function (req, res) {
    res.set("Access-Control-Allow-Origin", "*");
    //query mongoose model
    Animal.find().then(function (animals) {
        res.json(animals);
    });
});

app.put('/animals/:id', function (req, res) {
    console.log("body: ", req.body);
    let id = req.params.id
    console.log("PUT var id: ",id );
    console.log("PUT body ID: ", req.body.id)
    res.set("Access-Control-Allow-Origin", "*");
    var query = { _id: ObjectID(req.body.id) };
    var newval  =  { scheduled: req.body.scheduled  };
    var newvals = { name: req.body.name,
                    breed: req.body.breed,
                    age: req.body.age,
                    gender: req.body.gender,
                    color: req.body.color,
                    scheduled: req.body.scheduled,
                    description: req.body.description};
    console.log(query);
    console.log(newval);
    console.log("BOOL: ", req.body.scheduled);
    //animal being reserved
    if (req.body.scheduled == true) {
        Animal.findOneAndUpdate( query, newvals).then(function () {
            res.set("Access-Control-Allow-Origin", "*");
            res.sendStatus(200);
        });
    }
    //update animal to be put back up for adoption
    Animal.findOneAndUpdate( query, newvals).then(function () {
        res.set("Access-Control-Allow-Origin", "*");
        res.sendStatus(200);
    });


});
app.delete('/animals/:id' , function (req, res) {
    let animalId = req.body.id;
    console.log("DELETE ID: ", animalId);

    Animal.findOneAndDelete( {_id: ObjectID(req.body.id) }).then(function (animal) {
        console.log("this is hitting");
        if (animal) {
            console.log("is this is hitting");
            res.json(animal);
            console.log("is this is hitting");
            
        } else {
            console.log("this hitting");
            res.sendStatus(404);
        }
    }).catch(function () {
        res.sendStatus(400);
        console.log("??");
    });
});
app.post('/animals', function (req, res) {
    console.log("body: ", req.body);
    //create animal instance
    let animal = new Animal ({
        animal: req.body.animal,
        name: req.body.name,
        breed: req.body.breed,
        age: req.body.age,
        gender: req.body.gender,
        color: req.body.color,
        description: req.body.description,
        scheduled: req.body.scheduled

    });
    console.log("name", animal.name)
    //insert into mongoose model
    animal.save().then(function () {
        res.set("Access-Control-Allow-Origin", "*");
        res.sendStatus(201);
    }).catch(function (err) {
        if (err.errors) {
          var messages = {};
          for (let e in err.errors) {
            messages[e] = err.errors[e].message;
          }
          res.status(422).json(messages);
        } else {
          res.sendStatus(500);
        }
      });
});


app.listen(port, function () {
    console.log(`Listening on port  ${port}!`)
});
