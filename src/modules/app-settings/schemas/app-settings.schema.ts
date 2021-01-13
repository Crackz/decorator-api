import { Schema } from 'mongoose';
import { Languages } from '../../../common/constants';

export const AppSettingsSchema: Schema = new Schema({
	defaultLanguage: {
		type: String,
		enum: Object.values(Languages),
		required: true
	}
});

AppSettingsSchema.set('toJSON', {
	transform: function(doc, ret, options) {
		delete ret.__v;
		delete ret._id;
	}
});
