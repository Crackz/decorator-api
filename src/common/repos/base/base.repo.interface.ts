import { FindOneAndUpdateOption, UpdateManyOptions } from 'mongodb';
import {
	ModelPopulateOptions,
	ModelUpdateOptions,
	QueryFindOneAndRemoveOptions,
	QueryFindOneAndUpdateOptions
} from 'mongoose';

export type Partial<T> = { [P in keyof T]?: T[P] };

export type LocalizeOpts = {
	language: string;
	toJSON?: boolean;
};

export interface CreateOpts {
	populate?: ModelPopulateOptions | ModelPopulateOptions[];
	localizeOpts?: LocalizeOpts;
}

export interface UpdateOneOpts {
	populate?: ModelPopulateOptions | ModelPopulateOptions[];
	localizeOpts?: LocalizeOpts;
}

export interface FindOneOpts {
	populate?: ModelPopulateOptions | ModelPopulateOptions[];
	lean?: boolean;
	localizeOpts?: LocalizeOpts;
}

export interface DocumentQueryOpts extends FindOneOpts {
	sort?: any;
}

export interface DocumentQueryPaginatedOpts extends DocumentQueryOpts {
	limit?: number;
	page?: number;
}

export type rawResult = { n: number; nModified: number; ok: number };

export interface IBaseRepo<T> {
	create(createData: any): Promise<T>;
	insert(docs: any[]): Promise<T[]>;

	find(query?: Partial<T> | any, options?: DocumentQueryOpts): Promise<T[]>;
	findOne(query: Partial<T> | QueryFindOneAndRemoveOptions, options?: FindOneOpts): Promise<T>;
	findById(id: string | number, options?: FindOneOpts): Promise<T>;

	findByIdAndUpdate(
		id: string | number,
		update: Partial<T> | any,
		updateOpts?: QueryFindOneAndUpdateOptions
	): Promise<T>;
	findOneAndUpdate(
		query: Partial<T>,
		update: Partial<T>,
		options?: FindOneAndUpdateOption & DocumentQueryOpts
	): Promise<T>;

	update(query: Partial<T>, update: Partial<T>, options?: UpdateManyOptions & DocumentQueryOpts): Promise<rawResult>;
	updateOne(query: Partial<T>, update: Partial<T>, option?: ModelUpdateOptions & UpdateOneOpts): Promise<any>;

	deleteOne(query: Partial<T> | QueryFindOneAndRemoveOptions): Promise<{ ok?: number; n?: number }>;
	deleteMany(query: Partial<T>): Promise<{ ok?: number; n?: number }>;

	countDocuments(query: Partial<T> | any): Promise<number>;
	aggregate(pipelines: Array<Object>): Promise<any[]>;

	localize(doc: T[] | T, options: DocumentQueryOpts);
}
