import { Logger } from '@nestjs/common';
import { NestApplicationOptions } from '@nestjs/common/interfaces/nest-application-options.interface';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { useContainer } from 'class-validator';
import * as path from 'path';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { DefaultValidationPipe } from './common/pipe/default-validation.pipe';
import { Swagger } from './common/utils';
import { AppSettingsService } from './modules/app-settings/app-settings.service';
import { ConfigService } from './modules/config/config.service';
import * as i18n from 'i18n';
import { Languages } from './common/constants';


export class App {
    public static async start() {
        const logger = new Logger();
        logger.log(`Node Environment: ${process.env.NODE_ENV}`);
        
		i18n.configure({
			locales: Object.values(Languages),
			defaultLocale: Languages.AR,
			directory: path.join(__dirname, 'assets', 'locales'),
			autoReload: true,
			logWarnFn: (msg) => console.log('I18n warn', msg),
			logErrorFn: (msg) => console.log('I18n error', msg)
		});

        const appOptions: NestApplicationOptions = { cors: true };
        const app = await NestFactory.create<NestExpressApplication>(AppModule, appOptions);
		app.use(i18n.init);

        const appSettings = app.get<AppSettingsService>(AppSettingsService);
        await appSettings.init();

        useContainer(app.select(AppModule), { fallbackOnErrors: true });

        Swagger.setup(app);
        
        app.useStaticAssets(path.join(__dirname, '..', 'uploads'), { prefix: '/uploads' });

        app.setGlobalPrefix('api/v1');
        app.useGlobalPipes(new DefaultValidationPipe());
        app.useGlobalFilters(new AllExceptionsFilter());

        await app.listen(process.env.PORT! || 3000);
    }
}
