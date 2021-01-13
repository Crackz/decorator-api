import { Body, Controller, HttpCode, Patch, Get } from '@nestjs/common';
import { AppSettingsService } from './app-settings.service';
import { PatchAppSettingsDto } from './dtos/patch-app-settings.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth('App Settings')
@Controller('app-settings')
export class AppSettingsController {
	constructor(private readonly appSettingsService: AppSettingsService) { }

	@Get('/')
	async getAppSettings() {
		return await this.appSettingsService.get();
	}
}
