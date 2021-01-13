import { Body, Controller, HttpCode, Patch, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { ACGuard, UseRoles } from 'nest-access-control';
import { AccessControl } from 'src/app.roles';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dtos/create-admin.dto';
import { User } from 'src/common/decrators/user.decorator';
import { IUserModel } from '../user/interfaces/user.interface';

@ApiTags('Admin')
@ApiBearerAuth()
@Controller('admins')
export class AdminController {
	constructor(private readonly _adminService: AdminService) { }

	@HttpCode(204)
	@Patch('/')
	@UseGuards(JwtAuthGuard, ACGuard)
	@UseRoles({
		resource: AccessControl.Resources.CREATE_ADMIN,
		action: AccessControl.Actions.CREATE,
		possession: AccessControl.Possessions.ANY
	})
	async register(@Body() createAdminDto: CreateAdminDto, @User() currentUser: IUserModel): Promise<void> {
		await this._adminService.convertUserToAdmin(createAdminDto, currentUser);
	}
}
