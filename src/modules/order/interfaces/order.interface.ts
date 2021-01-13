import { Document } from 'mongoose';


export enum OrderStatus {
	PENDING = 'PENDING',
	WORK_IN_PROGRESS = 'WORK_IN_PROGRESS',
	FINISHED = 'FINISHED'
}

export interface Product {
	name: string;
	price: number;
	amount: number;
	unit: string;
}

export interface Order {
	_id: string;
	client: string;
	products: Product[];
	status: OrderStatus
	progressFiles?: string[];
	notes?: string;
	attachments?: string[];
}

export interface IOrderModel extends Order, Document {
	_id: string;
}
