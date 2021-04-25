const express = require('express');
const exphbs = require('express-handlebars');
const port = process.env.PORT || 3000;

const PaymentController = require('./controllers/paymentController');
const PaymentServices = require('./services/paymentServices');
const PaymentInstances = new PaymentController(new PaymentServices());

const app = express();

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
	res.render('home');
});

app.get('/detail', (req, res) => {
	res.render('detail', req.query);
});

app.post('/payment/new', (req, res) => {
	PaymentInstances.getMercadopagoLink(req, res);
});

app.post('/webhook', (req, res) => PaymentInstances.webhook(req, res));

app.use(express.static('assets'));

app.use('/assets', express.static(__dirname + '/assets'));

app.listen(port);
