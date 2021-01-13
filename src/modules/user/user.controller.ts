import { Controller, Get, Query, UseGuards, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ACGuard, UseRoles } from 'nest-access-control';
import { AccessControl } from 'src/app.roles';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { PaginatedResponse, ApiErrors } from '../../common/utils';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { IUserModel } from './interfaces/user.interface';
import { UserService } from './user.service';
import { User } from 'src/common/decrators/user.decorator';

@ApiTags('User')
@ApiBearerAuth()
@Controller('/')
export class UserController {
	constructor(private readonly _userService: UserService) { }

	@Get('/users')
	@UseGuards(JwtAuthGuard, ACGuard)
	@UseRoles({
		resource: AccessControl.Resources.USER,
		action: AccessControl.Actions.READ,
		possession: AccessControl.Possessions.ANY
	})
	async getAllUsersPaginated(
		@Query() query: PaginationDto = {},
	): Promise<PaginatedResponse<IUserModel>> {
		if (!query.page) query.page = 1;
		if (!query.limit) query.limit = 20;

		const { data, totalCount } = await this._userService.findAll(query);

		return new PaginatedResponse<IUserModel>({ data, totalCount, page: query.page, limit: query.limit });
	}

	@Get('/users/:userId')
	@UseGuards(JwtAuthGuard, ACGuard)
	@UseRoles({
		resource: AccessControl.Resources.USER,
		action: AccessControl.Actions.READ,
		possession: AccessControl.Possessions.OWN
	})
	async getUserById(
		@Param('userId') userId: string,
		@User() user: IUserModel
	): Promise<IUserModel> {
		if (user._id.toString() !== userId.toString())
			throw ApiErrors.Forbidden();

		return await this._userService.checkExist(userId);
	}

}
