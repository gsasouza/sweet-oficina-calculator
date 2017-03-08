/**
 * Created by Gabriel Souza on 01/12/2016.
 */

const express = require('express'),
  bodyParser = require('body-parser'),  
  path = require('path'),
  app = express(),
  Calculator = require('./calculatorModel'),
  port = process.env.PORT || 3000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'pug');


app.get('/', function (req, res) {
	res.render('result.pug');
	//res.redirect('/calculadora');		
})

app.get('/calculadora', function(req, res){
	res.render('calc.pug');
})

app.post('/caluladora', function (req, res) {
	let newCalc = new Calculator(req.body);
	res.render('result.pug', newCalc.getPriceInfo());	
});


app.use(function(req, res, next) {
  res.status = 404;
  res.send("Not Found!");
});

app.listen(port, function () {
  console.log('Server is running on PORT: ' + port);
});

module.exports = app;