const express = require('express');
const bodyParser = require('body-parser');
const ecphbs = require('express-handlebars');
const nodemailer = require('nodemailer');

const app = express();

app.engine('handlebars', exphbs());
app.set('view engine', 'habdlebars');

// parse application/x-www-form-urlencoded
app.use('/public', express.static(path.join(__dirname, 'public')));

// parse application/json
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hi');
});

app.listen(3000, () => console.log('Server started...'));