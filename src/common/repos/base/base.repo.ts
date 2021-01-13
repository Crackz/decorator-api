import { FindOneAndUpdateOption, UpdateManyOptions } from 'mongodb';
import {
	Document,
	DocumentQuery,
	Model,
	ModelUpdateOptions,
	QueryFindOneAndRemoveOptions,
	QueryFindOneAndUpdateOptions
} from 'mongoose';
import {
	DocumentQueryOpts,
	FindOneOpts,
	IBaseRepo,
	Partial,
	rawResult,
	UpdateOneOpts,
	DocumentQueryPaginatedOpts
} from './base.repo.interface';
import { PaginatedResult } from '../../models/paginated-result.model';

export abstract class BaseRepo<T> implements IBaseRepo<T> {
	constructor(private _model: Model<T & Document>) {}

	public constructDocumentQuery(
		documentQuery: DocumentQuery<T | any, any>,
		options = {} as DocumentQueryPaginatedOpts
	): DocumentQuery<T | any, any> {
		if (options.populate) documentQuery.populate(options.populate);

		if (options.sort) documentQuery.sort(options.sort);

		if (options.lean) documentQuery.lean(options.lean);

		if (options.limit) {
			documentQuery.limit(options.limit);

			if (options.page) documentQuery.skip((options.page - 1) * options.limit);
		}

		return documentQuery;
	}

	public async create(createData: any): Promise<T> {
		return await this._model.create(createData);
	}

	public async insert(docs: T[]): Promise<T[]> {
		return await this._model.insertMany(docs);
	}

	public async find(query: Partial<T> = {}, options?: DocumentQueryOpts): Promise<T[]> {
		const documentQuery = this._model.find(query);
		const result = await this.constructDocumentQuery(documentQuery, options).exec();
		return this.localize(result, options);
	}

	public async findPaginated(
		query: Partial<T> = {},
		options?: DocumentQueryPaginatedOpts
	): Promise<PaginatedResult<T>> {
		const documentQuery = this._model.find(query);
		const result = await this.constructDocumentQuery(documentQuery, options).exec();
		const totalCount = await this.countDocuments(query);
		return { data: this.localize(result, options), totalCount };
	}

	public async findOne(query: Partial<T> | QueryFindOneAndRemoveOptions, options?: FindOneOpts): Promise<T> {
		const documentQuery = this._model.findOne(query);
		const result = await this.constructDocumentQuery(documentQuery, options).exec();
		return this.localize(result, options);
	}

	public async findById(id: string, options?: FindOneOpts): Promise<T> {
		const documentQuery = this._model.findById(id);
		const result = await this.constructDocumentQuery(documentQuery, options).exec();
		return this.localize(result, options);
	}

	public async findByIdAndUpdate(id, update: Partial<T>, options: ModelUpdateOptions & FindOneOpts = {}): Promise<T> {
		const documentQuery = this._model.findByIdAndUpdate(id, update, options);
		const result = await this.constructDocumentQuery(documentQuery, options).exec();
		return this.localize(result, options);
	}

	public async findOneAndUpdate(
		query: Partial<T>,
		update: Partial<T>,
		options: QueryFindOneAndUpdateOptions & DocumentQueryOpts = {}
	): Promise<T> {
		const documentQuery = this._model.findOneAndUpdate(query, update, options);
		const result = await this.constructDocumentQuery(documentQuery, options).exec();
		return this.localize(result, options);
	}

	public async update(
		query: Partial<T>,
		updateData: Partial<T>,
		options: UpdateManyOptions & DocumentQueryOpts
	): Promise<rawResult> {
		const documentQuery = this._model.updateMany(query, updateData, options);
		return await this.constructDocumentQuery(documentQuery, options);
	}

	public async updateOne(
		query: Partial<T>,
		updateData: Partial<T>,
		options: ModelUpdateOptions & UpdateOneOpts = {}
	): Promise<any> {
		const result = await this._model.updateOne(query, updateData, options).exec();
		return this.localize(result, options);
	}

	public async countDocuments(query: Partial<T>): Promise<number> {
		return await this._model.countDocuments(query);
	}

	public async deleteOne(query: Partial<T> | QueryFindOneAndRemoveOptions): Promise<{ ok?: number; n?: number }> {
		return await this._model.deleteOne(query);
	}

	public async deleteMany(query: Partial<T>): Promise<{ ok?: number; n?: number }> {
		return await this._model.deleteMany(query);
	}

	public async aggregate(pipelines: Array<object>): Promise<any[]> {
		return await this._model.aggregate(pipelines);
	}

	public localize(doc: T[] | T, options: DocumentQueryOpts = {}) {
		if (options.localizeOpts && doc) {
			const localizationMethod = options.localizeOpts.toJSON
				? this._model.schema.methods.toJSONLocalizedOnly
				: this._model.schema.methods.toObjectLocalizedOnly;

			return localizationMethod(doc, options.localizeOpts && options.localizeOpts.language);
		}

		return doc;
	}

	get model() {
		return this._model;
	}
}
