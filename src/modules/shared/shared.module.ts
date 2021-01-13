import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import * as multer from 'multer';
import { AppSettingsModule } from '../app-settings/app-settings.module';

@Module({
	imports: [
		MulterModule.registerAsync({
			useFactory: () => ({
				storage: multer.memoryStorage(),
				limits: { fileSize: 1024 * 1024 * 12 } // limit 12 megabytes
			})
		}),
		AppSettingsModule
	],
	exports: [ MulterModule, AppSettingsModule ]
})
export class SharedModule {}
