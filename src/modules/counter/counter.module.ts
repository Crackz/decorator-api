import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { COUNTER_MODEL_NAME } from '../../common/constants';
import { SharedModule } from '../shared/shared.module';
import { CounterRepo } from './repos/counter.repo';
import { CounterSchema } from './schemas/counter.schema';
import { CounterService } from './counter.service';

@Module({
	imports: [
		MongooseModule.forFeature([{ name: COUNTER_MODEL_NAME, schema: CounterSchema }]),
		SharedModule
	],
	providers: [CounterService, CounterRepo],
	exports: [CounterService, CounterRepo]
})
export class CounterModule { }
