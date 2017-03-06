/**
 * Created by Gabriel Souza on 01/12/2016.
 */

const express = require('express'),
  bodyParser = require('body-parser'),  
  app = express(),
  Calculator = require('./calculatorModel'),
  port = process.env.PORT || 3000;

app.use('/calculadora', express.static('calculator'));
app.use('/agenda', express.static('calendar'));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.get('/', function (req, res) {
	res.redirect('/calculadora');
})
app.post('/caluladora', function (req, res) {
	let newCalc = new Calculator(req.body);
	res.send(newCalc.getPriceInfo());
})


app.use(function(req, res, next) {
  res.status = 404;
  res.send("Not Found!");
});

app.listen(port, function () {
  console.log('Server is running on PORT: ' + port);
});

module.exports = app;