var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var nodemailer = require('nodemailer');
//connect to database


//note: Your own  nodemailer and mongodb information must be added in order to use this application the way it was intended
mongoose.connect('mongodb://localhost:27017/banklogins');
/*note that the database for this application is stored locally, currently does not use a cloud service*/

//create a schema - this is like a blueprint

/*var smtpTrans = nodemailer.createTransport({
  	service: 'gmail',
  	auth: { 
        	user:"", // removed from github code 
		pass:""

   	}	

});*/



var loginSchema = new mongoose.Schema({

	user: String,
	pass: String,
	fName: String,
	lName: String,
	bal: Number

});

var login = mongoose.model('login', loginSchema);

var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app){



app.get('/', function(req, res){

    	res.render('index');

});

app.post('/contact',urlencodedParser, function(req, res){
   	console.log(req.body);
  	mailOpts = {
      		to: '',
      		subject: 'Website contact form',
      		text: "A user with the email address: " + req.body.email + " has sent you the following message\n\n" +  req.body.message
  };

    	smtpTrans.sendMail(mailOpts, function (error, response) {
      	//Email not sent
      		if (error) {
	  		console.error(error);
          		res.render('404');
		}
      		else{

		res.render('contact');

     		} } );


});
app.get('/contact', function(req,res){


 	res.render('contact');



});
app.post('/signup', urlencodedParser , function(req, res){

    	console.log('made it to post');
    	console.log(req.body.user);

	login.findOne({user: req.body.user}, function(err,data){
		if(err) res.redirect('/404');
		if(data != null){
	  	 res.redirect('/usrtaken');
		}
	const saltRounds = 10;//a salt is a long string of random bytes
 	bcrypt.hash(req.body.pass, saltRounds, function(err, hash){
		req.body.pass = hash;
		var newLogin = login(req.body).save(function(err,data){
        		if(err) res.redirect('/404');
        
        		console.log(data + " sent to mongo");
		
		
			res.render('user', {profile: data});// After a successful signup we get sent straight into our profile


    		});
	});

	
 });
    

});




app.get('/404', function(req,res) { 

   res.render('404');

});

var transferdata;

app.post('/', urlencodedParser, function(req,res) {

   	login.findOne({user: req.body.user,}, function(err, data){
		if(err){ res.redirect('/404');}
		console.log("we have registered " + data);
		if(data === null) {
			res.redirect('/usrtaken');
			return;
		}
	bcrypt.compare(req.body.pass, data.pass, function(err,res2){
		if(res2 === false){
			res.redirect('/404');
			return;
		}
		if(res2 === true){
			transferdata = data;// this is what i used to make sure the data passed over into the user get request I took advantage of the global scope here so i would not have to use passport for authentication

			console.log("Data is : " + data);
			console.log("TransferData is: " + transferdata);
			res.redirect('/user');
			return
		}
	});

    });


});


app.get('/user', function(req,res){

	var data = transferdata;
	console.log(data);
	res.render('user', {profile: data});


});

app.get('/usrtaken', function(req, res){


	res.render('usrtaken');


});
app.get('/signup', function(req, res){
  	res.render('signup');
});

app.post('/user', urlencodedParser, function(req, res){
  	console.log(req.body.balance);
  	var data = transferdata;// this is used to get the user data from the global scope
  	console.log("user is " + data);
  	login.update(data, {$set: {bal: req.body.balance}}, function(err,data){
	   transferdata.bal = req.body.balance;
	   console.log("this happened");
  	});
	console.log(transferdata +"---------this souldnt happen before"); 
    	//transferdata.bal = req.body.balance;// when we send a get request to the use the /user page has to reload with the new balance information 
 	res.redirect('/user');

});
}
