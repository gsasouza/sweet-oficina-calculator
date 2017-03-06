/**
 * Created by Gabriel Souza on 01/12/2016.
 */

var express = require('express'),
  bodyParser = require('body-parser'),  
  app = express(),
  port = process.env.PORT || 3000;

app.use('/', express.static('calculator'));
app.use('/agenda', express.static('calendar'));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.get('/update', function (req, res) {
	res.redirect('/agenda');
});

app.post('/update', function (req, res) {
	console.log(req.body)
	res.send('POST');
})


app.use(function(req, res, next) {
  res.status = 404;
  res.send("Not Found!");
});

app.listen(port, function () {
  console.log('Server is running on PORT: ' + port);
});

module.exports = app;