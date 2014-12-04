var express = require('express');
var app = express();
var fs = require('fs');
var pg = require('pg');

app.use(express.static(__dirname + '/images'));
app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));


app.get('/', function(request, response) {
  //response.send('Hello World!');
  var buffer = new Buffer(fs.readFileSync('index.html'));
  response.send(buffer.toString('utf-8'));
});

app.get('/submitForm', function(request, response) {
	
	pg.connect(process.env.DATABASE_URL, function(err, client, done) {
		
		console.log('******Received money as: ' + request.query.payment);
		
		//client.query('INSERT into salesforce.follower__c (FirstName__c, LastName__c, Money_Donated__c, Team__c) VALUES ($1, $2, $3, $4)', [firstName, lastName, money, teamid],
		//client.query('INSERT INTO salesforce.contact (FirstName, LastName) VALUES ($1, $2)', [firstName, lastName],
		function(err, result) 
		{
			if (err) 
			{
		    	console.log(err);
		    } else {
		    	console.log('************row inserted');
				response.redirect('/');
			}
		 
	  });
	});
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});
