import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ORDER_MODEL_NAME } from '../../common/constants';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { OrderRepo } from './repos/order.repo';
import { OrderSchema } from './schemas/order.schema';
import { ClientModule } from '../client/client.module';

@Module({
	imports: [
		MongooseModule.forFeature([{ name: ORDER_MODEL_NAME, schema: OrderSchema }]),
		forwardRef(() => ClientModule)
	],
	controllers: [OrderController],
	providers: [OrderService, OrderRepo],
	exports: [OrderService]
})
export class OrderModule { }
