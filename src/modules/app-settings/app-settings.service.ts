import { Injectable, Logger } from '@nestjs/common';
import { IAppSettingsModel } from './interfaces/app-settings.interface';
import { AppSettingsRepo } from './repos/app-settings.repo';

@Injectable()
export class AppSettingsService {
	constructor(private _appSettingsRepo: AppSettingsRepo) {}

	async getValueOf(key) {
		const appSettings = await this._appSettingsRepo.findOne({});
		console.log(appSettings, 'appSettings');
		return appSettings && appSettings[key];
	}
	async get(): Promise<IAppSettingsModel> {
		return await this._appSettingsRepo.findOne({});
	}

	async init() {
		const logger = new Logger('App Settings');
		logger.verbose('Initializing App Settings');

		let appSettings = await this._appSettingsRepo.findOne({});
		if (!appSettings)
			await this._appSettingsRepo.create({
				defaultLanguage: process.env.defaultLanguage,
			} as IAppSettingsModel);
	}
}
