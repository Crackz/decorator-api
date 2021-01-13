import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_SETTINGS_MODEL_NAME } from '../../common/constants';
import { appSettingsProviders } from './app-settings.providers';
import { AppSettingsService } from './app-settings.service';
import { AppSettingsRepo } from './repos/app-settings.repo';
import { AppSettingsSchema } from './schemas/app-settings.schema';

@Module({
	imports: [ MongooseModule.forFeature([ { name: APP_SETTINGS_MODEL_NAME, schema: AppSettingsSchema } ]) ],
	// controllers: [ AppSettingsController ],
	providers: [ AppSettingsRepo, AppSettingsService, ...appSettingsProviders ],
	exports: [ AppSettingsService ]
})
export class AppSettingsModule {}
