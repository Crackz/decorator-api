import { BaseRepo } from '../repos/base/base.repo';
import { IBaseService, CheckExistsOpts } from './base.service.interface';
import { isValidId, ApiErrors, isValidNumber } from '../utils';

export abstract class BaseService implements IBaseService {
	constructor(private _baseRepo: BaseRepo<any>, private opts?: { isNumberId?: boolean }) { }

	async checkExist<T>(id: string, opts?: CheckExistsOpts): Promise<T> {
		const errOpts = {} as any;
		const findByIdOpts = {} as any;
		if (opts && opts.param) errOpts.param = opts.param;
		if (opts && opts.lean) findByIdOpts.lean = opts.lean;

		if (this.opts && this.opts.isNumberId) {
			if (!isValidNumber(+id))
				throw ApiErrors.NotFound(errOpts);
		} else {
			if (!isValidId(id))
				throw ApiErrors.NotFound(errOpts);
		}




		const foundModel = await this._baseRepo.findById(id, findByIdOpts);
		if (!foundModel) throw ApiErrors.NotFound(errOpts);

		return foundModel;
	}
}
