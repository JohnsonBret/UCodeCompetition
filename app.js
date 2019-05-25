require('./config/config');

var express = require('express');
var hbs = require('hbs');
var bodyParser  = require("body-parser");
var {mongoose} = require('./db/mongoose');
var {Competition} = require('./models/competition');
const _ = require('lodash');

var app = express();

app.set("view engine", "hbs");
hbs.registerPartials(__dirname + "/views/partials");
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));

const port = process.env.PORT || 3000;


app.get("/", function(req, res){
    var count;
    Competition.find().then((competitors)=>{
        // console.log("Length of Candidates "+ candidates.length)
        count = competitors.length;

        res.status(200).render("home", {count: count});
        })
 
    
});

app.get("/signups", (req, res)=>{
    Competition.find({}).then((competitors)=>{
        res.status(200).send({competitors});
    })

});

app.get("/beginner", (req, res)=>{

     Competition.find().then((competitors)=>{
        // console.log("Length of Candidates "+ candidates.length)
        count = competitors.length;

        res.status(200).render("beginner", {count: count});
    })
    
});

app.get("/thanks", (req, res)=>{
    res.status(200).render("thanks", {});
});

app.get("/emails", async (req, res)=>{
    const competitors = await Competition.find({});

    let emails = _.pick(competitors, ['email']);

    res.status(200).send({emails});

});

app.get("/count", (req, res) =>{
    
});

app.post("/register", function(req, res){
    var body = _.pick(req.body, ['email', 'name','tier', 'location']);

    console.log(JSON.stringify(body, undefined,2));

    var competitor = new Competition(body);

    competitor.save().then(()=>{
        res.status(200).send({
            status: "successfully created competitor",
            name: body.name,
            email: body.email,
            tier: body.tier,
            location: body.location
        });
    }).catch((e)=>{
        res.status(400).send({errorMsg: e});
    });
});


app.listen(port, ()=>{
    console.log(`Server up on Port ${port}`);
});