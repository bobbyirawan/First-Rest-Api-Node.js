const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();

// PARSE APLICATION/JSON
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(morgan('dev'));

// PANGGIL ROUTES
var routes = require('./routes');
routes(app);

// DAFTARKAN MENU ROUTES DARI INDEX
app.use('/auth', require('./middleware/index-auth'));

const PORT = 3000;

app.listen(PORT, () => {
    console.log('Server started on port:',PORT);
});