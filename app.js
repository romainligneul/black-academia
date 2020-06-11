// --- LOADING MODULES
var express = require('express'),
    mongoose = require('mongoose'),
    body_parser = require('body-parser');


// --- INSTANTIATE THE APP
var app = express();

// MongoDB

console.log(process.env.NODE_ENV)
var emptySchema = new mongoose.Schema({}, { strict: false });
var Entry = mongoose.model('Entry', emptySchema);

if (process.env.NODE_ENV === 'development') {
    // Define the development db
    mongoose.connect('mongodb://localhost/jspsych');
 } else if (process.env.NODE_ENV === 'production') {
    // Define the production db
    mongoose.connect(process.env.CONNECTION);
 }

 var db = mongoose.connection;
 db.on('error', console.error.bind(console, 'connection error'));
 db.once('open', function callback() {
     console.log('database opened');
 });

//// --- STATIC MIDDLEWARE
//app.use(express.static(__dirname + '/public'));
//app.use('/jsPsych', express.static(__dirname + "/jsPsych"));
app.use(express.static(__dirname + '/public'));

//app.use('jspsychfolder', express.static(__dirname + "/jspsychfolder"));

app.use(body_parser.json());

// --- VIEW LOCATION, SET UP SERVING STATIC HTML
app.set('views', __dirname + '/public/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// --- ROUTING
app.get('/', function(request, response) {
    response.render('index.html');
});

app.get('/experiment', function(request, response) {
    response.render('iat.html');
});

app.get('/finish', function(request, response) {
    response.render('finish.html');
});

app.post('/experiment-data', function(request, response){
    Entry.create({
        "data":request.body
    });
    response.end();
})

// --- START THE SERVER
if (process.env.NODE_ENV === 'development') {

  var server = app.listen(3000, function(){
      console.log("Listening on port %d", server.address().port);
  });

} else if (process.env.NODE_ENV === 'production') {
   // Define the production db
   var server = app.listen(process.env.PORT, function(){
       console.log("Listening on port %d", server.address().port);
   });

 }
