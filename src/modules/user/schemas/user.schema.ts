import * as _ from 'lodash';
import { Schema, SchemaDefinition } from 'mongoose';
import { AccessControl } from '../../../app.roles';
import { Languages } from '../../../common/constants';

export const userSchemaDefinition: SchemaDefinition = {
	name: {
		type: String,
		required: true
	},
	phone: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true
	},
	profileImg: {
		type: String,
		required: true
	},
	language: {
		type: String,
		enum: Object.values(Languages),
		default: Languages.AR
	},
	roles: [
		{
			type: String,
			required: true,
			enum: Object.values(AccessControl.Roles)
		}
	]
};


export const userSchemaDefinitionExcludedSensitiveData = _.omit(userSchemaDefinition, ['password', 'roles']);

export const UserSchema: Schema = new Schema(userSchemaDefinition, { timestamps: true });

UserSchema.set('toJSON', {
	transform: function (doc, ret, options) {
		const defaultRemovableFields = ['password', 'language', 'id', '__v'];
		const includeFields: string[] = (options && options.includeFields) || [];
		defaultRemovableFields.forEach((removableField) => {
			if (!includeFields.includes(removableField)) delete ret[removableField];
		});
	},
	getters: true
});
