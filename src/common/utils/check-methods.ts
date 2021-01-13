import * as mongoose from 'mongoose';

export const isValidNumber = (id) => (Number.isInteger(id) ? true : false);
export const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);
export const isValidUrl = (value) =>
	/https?:\/\/(localhost|www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/.test(
		value
	);
