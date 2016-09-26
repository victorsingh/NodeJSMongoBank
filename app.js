var express = require('express');
var controller = require('./controller/controller');

var app = express();


app.set('view engine', 'ejs');

app.use(express.static('./public'));

controller(app);


app.listen(8000);


console.log('WebProject 7 - Listenung to port 3000');


