import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { UserModule } from '../user/user.module';
import { AdminController } from './admin.controller';

@Module({
	imports: [
		UserModule
	],
	controllers: [AdminController],
	providers: [AdminService],
})
export class AdminModule { }
