import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepo } from '../../../common/repos/base/base.repo';
import { APP_SETTINGS_MODEL_NAME } from '../../../common/constants';
import { IAppSettingsModel } from '../interfaces/app-settings.interface';

@Injectable()
export class AppSettingsRepo extends BaseRepo<IAppSettingsModel> {
	constructor(
		@InjectModel(APP_SETTINGS_MODEL_NAME) private readonly appSettingsModel: Model<IAppSettingsModel>) {
		super(appSettingsModel);
	}

}
