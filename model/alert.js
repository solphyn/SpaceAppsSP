const mongoose = require('mongoose');
const mongooseStringQuery = require('mongoose-string-query');


const AlertSchema = new mongoose.Schema(
	{
		type: {
			type: String,
			required: true,
			enum: ['alerta', 'informativo'],
			default: 'informativo',
		},
		status: {
			type: String,
			required: true,
			enum: ['ativado', 'desativado'],
			default: 'ativado',
		},
		location: {
			type: { type: String },
			coordinates: []
        },
         
        created: {
			type: Date,
			required: false,
			default: Date.now()
        }
    },
	{ minimize: false }
);

AlertSchema.plugin(mongooseStringQuery);

const Alert = mongoose.model('Alert', AlertSchema);
module.exports = Alert;