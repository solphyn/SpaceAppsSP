const mongoose = require('mongoose');
const mongooseStringQuery = require('mongoose-string-query');


const DeviceSchema = new mongoose.Schema(
	{
		code: {
			type: String,
			required: true,
			trim: true,
		},
		status: {
			type: String,
			required: true,
			enum: ['ativado', 'desativado', 'sem comunicação', 'manutenção'],
			default: 'ativado',
		},
		location: {
			type: { type: String },
			coordinates: []
		   },
		temperature: {
			type: Number,
			required: true,
			trim: true,
		},
		altitude: {
			type: Number,
			required: true,
			trim: true,
		},
		seaTemperature: {
			type: Number,
			required: true,
			trim: true,
		},
		   
	},
	{ minimize: false }
);

DeviceSchema.plugin(mongooseStringQuery);

const Device = mongoose.model('Device', DeviceSchema);
module.exports = Device;