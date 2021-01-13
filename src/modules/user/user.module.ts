import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { USER_MODEL_NAME } from '../../common/constants';
import { SharedModule } from '../shared/shared.module';
import { UserRepo } from './repos/user.repo';
import { UserSchema } from './schemas/user.schema';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
	imports: [
		MongooseModule.forFeature([{ name: USER_MODEL_NAME, schema: UserSchema }]),
		SharedModule
	],
	controllers: [UserController],
	providers: [UserService, UserRepo],
	exports: [UserService, UserRepo]
})
export class UserModule { }
