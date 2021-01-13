import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { COUNTER_MODEL_NAME } from '../../../common/constants';
import { BaseRepo } from '../../../common/repos/base/base.repo';
import { ICounterModel } from '../interfaces/counter.interface';

@Injectable()
export class CounterRepo extends BaseRepo<ICounterModel> {
	constructor(@InjectModel(COUNTER_MODEL_NAME) private readonly counterModel: Model<ICounterModel>) {
		super(counterModel);
	}
}
