const express = require("express");
const path = require("path");
const app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser')
mongoose.connect('mongodb://localhost/contact' , {useNewUrlParser: true , useUnifiedTopology: true});
// EXPRESS SPECIF STUFF
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});
const port = 80;
app.use(bodyParser.urlencoded({ extended: false }));

var contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  phno: String,
  age: String,
  gender: String,
  address: String
}); 

var contact = mongoose.model('contact', contactSchema);

app.use('/static',express.static('static'));
// app.use(express.urlencoded);

//PUG SPECIF STUFF
app.set('view engine','pug');
app.set('views',path.join(__dirname,'views'));

app.get('/',(req, res)=>{
    // const params = { }
res.status(200).render('home.pug');
});
app.get('/contact',(req, res)=>{
    // const params = { }
res.status(200).render('contact.pug');
});
app.get('/',(req, res)=>{
    // const params = { }
res.status(200).render('contact.pug');
});

app.post('/contact',(req, res)=>{
  var myData = new contact(req.body);

  myData.save(function(err, doc) {
    if (err) return console.error(err);
    res.send("data is saved successfully")
    console.log("Document inserted succussfully!");
  });
  });

  

app.listen(port, () => {

    console.log(  port);
});