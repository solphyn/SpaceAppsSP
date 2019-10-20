const errors = require('restify-errors');

const Device = require('../model/device');
const Alert = require('../model/alert');

module.exports = function(server) {

	server.post('/devices', (req, res, next) => {
		if (!req.is('application/json')) {
			return next(
				new errors.InvalidContentError("Expects 'application/json'")
			);
		}

		let data = req.body || {};

		let device = new Device(data);
		device.save(function(err) {
			if (err) {
				console.error(err);
				return next(new errors.InternalError(err.message));
				next();
			}

			res.send(201);
			next();
		});
	});

	server.get('/devices', (req, res, next) => {
		Device.apiQuery(req.params, function(err, docs) {
			if (err) {
				console.error(err);
				return next(
					new errors.InvalidContentError(err.errors.name.message)
				);
			}

			res.send(docs);
			next();
		});
	});

	server.get('/status', (req, res, next) => {
		Alert.apiQuery(req.params, function(err, docs) {
			if (err) {
				console.error(err);
				return next(
					new errors.InvalidContentError(err.errors.name.message)
				);
			}

			res.send(docs);
			next();
		});
	});


	server.put('/devices/:device_id', (req, res, next) => {
		if (!req.is('application/json')) {
			return next(
				new errors.InvalidContentError("Expects 'application/json'")
			);
		}

		let data = req.body || {};

		if (!data._id) {
			data = Object.assign({}, data, { _id: req.params.device_id });
		}

		Device.findOne({ _id: req.params.device_id }, function(err, doc) {
			if (err) {
				console.error(err);
				return next(
					new errors.InvalidContentError(err.errors.name.message)
				);
			} else if (!doc) {
				return next(
					new errors.ResourceNotFoundError(
						'Deu Ruim'
					)
				);
			}

			Device.updateOne({ _id: data._id }, data, function(err) {
				if (err) {
					console.error(err);
					return next(
						new errors.InvalidContentError(err.errors.name.message)
					);
				}

				res.send(200, data);
				next();
			});
		});
	});

};