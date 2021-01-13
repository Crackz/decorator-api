import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaginatedResult } from 'src/common/models/paginated-result.model';
import { CLIENT_MODEL_NAME } from '../../../common/constants';
import { BaseRepo } from '../../../common/repos/base/base.repo';
import { IClientModel } from '../interfaces/client.interface';
import { SortTypes } from '../dtos/find-clients.dto';

@Injectable()
export class ClientRepo extends BaseRepo<IClientModel> {
	constructor(@InjectModel(CLIENT_MODEL_NAME) private readonly clientModel: Model<IClientModel>) {
		super(clientModel);
	}

	private _convertSortStringToNumber(word: SortTypes) {
		if (word === 'asc') return 1;
		else return -1;
	}

	async getAll(
		opts?: {
			page?: number;
			limit?: number;
			name?: string;
			phone?: string;
			address?: string;
		},
		sort?: { name?: SortTypes; phone?: SortTypes; address: SortTypes }
	): Promise<PaginatedResult<IClientModel>> {
		const findQuery: any = {},
			sortQuery: any = {};

		if (opts && opts.name) findQuery.name = { $regex: opts.name, $options: 'i' };
		if (opts && opts.phone) findQuery.phones = { $regex: opts.phone, $options: 'i' };
		if (opts && opts.address) findQuery.address = { $regex: opts.address, $options: 'i' };

		if (Object.keys(sort).length === 0) sortQuery.createdAt = -1;
		if (sort && sort.name) sortQuery.name = this._convertSortStringToNumber(sort.name);
		if (sort && sort.phone) sortQuery.phones = this._convertSortStringToNumber(sort.phone);
		if (sort && sort.address) sortQuery.address = this._convertSortStringToNumber(sort.address);

		return await this.findPaginated(findQuery, { page: opts.page, limit: opts.limit, sort: sortQuery });
	}
}
