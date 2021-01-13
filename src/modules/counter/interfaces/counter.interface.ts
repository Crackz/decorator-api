import { Document } from 'mongoose';

export interface Counter {
	readonly _id: string;
	seq: number;
}

export interface ICounterModel extends Counter, Document {
	readonly _id: string;
}

export enum CounterNames {
	CLIENT = 'client'
}
