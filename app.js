var express = require('express');
var controller = require('./controller/controller');

var app = express();


app.set('view engine', 'ejs');

app.use(express.static('./public'));//serve static files from public folder.

controller(app);


app.listen(8000);


console.log('Time to bank(fictionally of course) - Listening to port 8000');


