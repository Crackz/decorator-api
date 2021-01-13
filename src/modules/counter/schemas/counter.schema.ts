import { Schema } from 'mongoose';
import { CounterNames } from '../interfaces/counter.interface';

export const CounterSchema: Schema = new Schema({
	_id: {
		type: String,
		required: true,
		enum: Object.values(CounterNames)
	},
	seq: {
		type: Number,
		default: 0
	}
});

CounterSchema.index({ _id: 1, seq: 1 }, { unique: true })
