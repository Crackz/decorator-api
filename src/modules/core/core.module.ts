import { Logger, Module, OnModuleInit, Inject } from '@nestjs/common';
import { MongooseModule, getConnectionToken } from '@nestjs/mongoose';
import { AccessControlModule } from 'nest-access-control';
import { roles } from '../../app.roles';
import { AuthModule } from '../auth/auth.module';
import { AdminModule } from '../admin/admin.module';
import { ClientModule } from '../client/client.module';
import { OrderModule } from '../order/order.module';

@Module({
	imports: [
		AccessControlModule.forRoles(roles),
		MongooseModule.forRootAsync({
			useFactory: () => {
				const logger = new Logger('Db');
				logger.log(`Connecting To: ${process.env.DB_CONNECTION_STRING}`);

				return {
					uri: process.env.DB_CONNECTION_STRING,
					useFindAndModify: false,
					useCreateIndex: true,
					useNewUrlParser: true,
					useUnifiedTopology: true
				};
			},
			inject: []
		}),
		AuthModule,
		AdminModule,
		ClientModule,
		OrderModule
	]
})
export class CoreModule {}
