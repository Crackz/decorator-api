import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepo } from '../../../common/repos/base/base.repo';
import { USER_MODEL_NAME } from '../../../common/constants';
import { IUserModel, User } from '../interfaces/user.interface';
import { PaginatedResult } from 'src/common/models/paginated-result.model';

@Injectable()
export class UserRepo extends BaseRepo<IUserModel> {
	constructor(@InjectModel(USER_MODEL_NAME) private readonly userModel: Model<IUserModel>) {
		super(userModel);
	}

	getUserOnRegistrationOrLogin(user: IUserModel): User {
		const toJSONOptions = Object.assign({}, (this.userModel.schema as any).options.toJSON);
		toJSONOptions.transform = true;
		toJSONOptions.includeFields = ['language'];

		return (user as any).toJSON(toJSONOptions);
	}
}
