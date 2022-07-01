const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000;
const compression = require('compression');

//gzip 
app.use(compression());

//api
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
const api = require('./api/routes.js');
app.use('/api', api);

//ui
const ui = path.resolve(`${__dirname}/build`);
app.use(express.static(ui));
app.get('*', (req, res) => {
	res.sendFile(ui+'/index.html');
});


app.listen(PORT);
console.log(`Serving UI / API at ${PORT}`);
