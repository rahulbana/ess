const express = require('express');
const bodyParser = require('body-parser');
const morgan      = require('morgan');
const PORT = 3000;
const app = express(); 

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'))

require('./routes/index')(app);

app.listen(PORT,()=>{
 console.log('server is running on port '+PORT) 
});