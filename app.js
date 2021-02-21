const express = require("express");
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const bodyparser = require("body-parser")
mongoose.connect('mongodb://localhost/contact', {useNewUrlParser: true,  useUnifiedTopology: true});
const port = 800;


var ContactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    more: String
  });

var contact = mongoose.model('contact', ContactSchema);


// For serving static file
app.use('/static',express.static('static'))
app.use(express.urlencoded())

//set the template engine as pug
app.set('view engine', 'pug')

// Set The Views Directory
app.set('views', path.join(__dirname, 'view'))

// Endpoint
app.get("/", (req, res)=>{
    res.status(200).render('home.pug')
});
app.get("/contact", (req, res)=>{
    res.status(200).render('contact.pug')
});
app.post("/contact", (req, res)=>{
    var myData = new contact(req.body);
    myData.save().then(()=>{
        res.send("Data is saved to database")
    }).catch(()=>{
        res.status(400).send("Not saved")
    });
    // res.status(200).render('contact.pug')
})

















// Start the server
app.listen(port, ()=>{
    console.log(`The app started sucessfully on port ${port}`);
});