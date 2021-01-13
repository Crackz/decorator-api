import { Schema } from 'mongoose';
import { ClientGender } from '../interfaces/client.interface';

const ClientSchema: Schema = new Schema({
	_id: Number,
	name: {
		type: String,
		required: true
	},
	phones: [{
		type: String,
		required: true,
	}],
	address: {
		type: String
	},
	gender: {
		type: String,
		enum: Object.values(ClientGender),
		required: true
	}
}, { timestamps: true });


ClientSchema.set('toJSON', {
	transform: function (doc, ret, options) {
		delete ret.__v;
	},
});
export { ClientSchema };
