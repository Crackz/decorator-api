import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CLIENT_MODEL_NAME } from '../../common/constants';
import { ClientService } from './client.service';
import { ClientRepo } from './repos/client.repo';
import { ClientSchema } from './schemas/client.schema';
import { ClientController } from './client.controller';
import { CounterModule } from '../counter/counter.module';
import { OrderModule } from '../order/order.module';

@Module({
	imports: [
		MongooseModule.forFeature([{ name: CLIENT_MODEL_NAME, schema: ClientSchema }]),
		CounterModule, 
		OrderModule
	],
	controllers: [ClientController],
	providers: [ClientService, ClientRepo],
	exports: [ClientService, ClientRepo]
})
export class ClientModule { }
