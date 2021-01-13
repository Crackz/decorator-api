import { Schema } from 'mongoose';
import * as mongoose from 'mongoose';
import { CLIENT_MODEL_NAME } from '../../../common/constants';
import { OrderStatus } from '../interfaces/order.interface';

const ProductSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	price: {
		type: Number,
		required: true
	},
	amount: {
		type: Number,
		required: true
	},
	unit: {
		type: String,
		required: true
	},
})

const OrderSchema: Schema = new Schema({
	client: {
		type: Number,
		ref: CLIENT_MODEL_NAME,
		required: true
	},
	products: {
		type: [ProductSchema],
		required: true
	},
	notes: {
		type: String,
	},
	progressImgs: [{
		type: String,
	}],
	attachments: [{
		type: String,
	}],
	status: {
		type: String,
		enum: [OrderStatus.PENDING, OrderStatus.WORK_IN_PROGRESS, OrderStatus.FINISHED],
		default: OrderStatus.PENDING
	}
}, { timestamps: true });


OrderSchema.set('toJSON', {
	transform: function (doc, ret, options) {
		delete ret.__v;
	},
});
export { OrderSchema };

