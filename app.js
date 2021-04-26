let express = require('express');
let exphbs = require('express-handlebars');
let port = process.env.PORT || 3000;
let app = express();

const PaymentController = require('./controllers/paymentController');
const PaymentServices = require('./services/paymentServices');
const PaymentInstances = new PaymentController(new PaymentServices());

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
	res.render('home');
});

app.get('/detail', (req, res) => {
	res.render('detail', req.query);
});

app.get('/success', (req, res) => {
	res.render('success', req.query);
});

app.get('/pending', (req, res) => {
	res.render('pending');
});

app.get('/error', (req, res) => {
	res.render('error');
});

app.post('/payment/new', (req, res) => {
	PaymentInstances.getMercadopagoLink(req, res);
});

app.post('/webhook', (req, res) => PaymentInstances.webhook(req, res));

app.use(express.static('assets'));

app.use('/assets', express.static(__dirname + '/assets'));

app.listen(port);
