import { Document } from 'mongoose';
import { Omit } from '../../../common/utils/omit';

export enum ClientGender {
	MALE = 'MALE',
	FEMALE = 'FEMALE'
}

export interface Client {
	readonly _id: string;
	name: string;
	phone: string[];
	address: string;
	gender: ClientGender
}


export interface IClientModel extends Omit<Client, '_id'>, Document { }