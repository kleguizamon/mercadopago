const axios = require('axios');

class PaymentServices {
	constructor() {
		this.token = {
			prod: {},
			test: {
				access_token:
					'APP_USR-6317427424180639-042414-47e969706991d3a442922b0702a0da44-469485398',
			},
		};
		// this.mercadoPagoUrl = 'https://api.mercadopago.com/checkout';
	}

	async createPaymentMercadoPago(name, price, unit, img) {
		const url = `https://api.mercadopago.com/checkout/preferences?acess_token=${this.token.test.access_token}`;

		const items = [
			{
				id: '1234',
				title: name,
				description: 'Dispositivo móvil de Tienda e-commerce',
				picture_url: '',
				category_id: '1234',
				quantity: parseInt(unit),
				currency_id: 'ARS',
				unit_price: parseInt(price),
			},
		];

		const preferences = {
			items,
			external_references: 'legui.kevin@gmail.com',
			payer: {
				name: 'Lalo',
				surname: 'Landa',
				email: 'test_user_63274575@testuser.com',
				phone: {
					area_code: '11',
					number: '22223333',
				},
				address: {
					zip_code: '1111',
					street_name: 'False',
					street_number: '123',
				},
			},
			payment_methods: {
				excluded_payment_methods: [
					{
						id: 'amex',
					},
				],
				excluded_payment_types: [{ id: 'atm' }],
				installments: 6,
				default_installments: 6,
			},
			back_urls: {
				success: 'cambiar',
				pending: 'cambiar',
				failure: 'cambiar',
			},
			notification_url: 'httlwebhoo',
			auto_return: 'approved',
		};

		try {
			const req = await axios.post(url, preferences, {
				headers: {
					'Content-type': 'application/json',
					'x-integrator-id': 'dev_24c65fb163bf11ea96500242ac130004',
					'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, HEAD',
				},
			});
			return req.data;
		} catch (err) {
			console.log(err);
		}
	}
}

module.exports = PaymentServices;