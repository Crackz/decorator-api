import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ORDER_MODEL_NAME } from '../../../common/constants';
import { BaseRepo } from '../../../common/repos/base/base.repo';
import { IOrderModel } from '../interfaces/order.interface';

@Injectable()
export class OrderRepo extends BaseRepo<IOrderModel> {
	constructor(@InjectModel(ORDER_MODEL_NAME) private readonly orderModel: Model<IOrderModel>) {
		super(orderModel);
	}
}
