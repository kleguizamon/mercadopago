class PaymentController {
	constructor(paymentServices) {
		this.paymentServices = paymentServices;
	}

	async getMercadopagoLink(req, res) {
		const { name, price, unit, img } = req.query;
		try {
			const checkout = await this.paymentServices.createPaymentMercadoPago(
				name,
				price,
				unit,
				img
			);
			console.log(checkout, 'checkout response');
			return res.redirect(checkout.init_point);
		} catch (err) {
			res.redirect('/');
			return res.status(500).json({ error: 'Error al procesar el pago' });
		}
	}

	async webhook(req, res) {
		if (req.method === 'POST') {
			let body = '';
			req.on('data', (chunk) => {
				body += chunk.toString();
			});
			req.on('end', () => {
				console.log(body, 'webhook response');
				res.end('ok');
			});
		}
		return res.status(201);
	}
}

module.exports = PaymentController;
