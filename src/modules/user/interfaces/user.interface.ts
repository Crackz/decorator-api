import { Document } from 'mongoose';
import { Languages } from '../../../common/constants';
import { Omit } from '../../../common/utils/omit';

export interface User {
	readonly _id: string;
	name: string;
	phone: string;
	profileImg: string;
	language: Languages;
}


export interface IUserModel extends Omit<User, '_id'>, Document {
	readonly _id: string;
	password: string;
	roles: string[];
}

export type IUserModelExcluded = Exclude<IUserModel, 'password' | 'roles'>;
