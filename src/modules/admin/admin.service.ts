import { Injectable } from '@nestjs/common';
import { AccessControl } from 'src/app.roles';
import { UserRepo } from '../user/repos/user.repo';
import { CreateAdminDto } from './dtos/create-admin.dto';
import { ApiErrors, isValidId } from '../../common/utils';
import { IUserModel } from '../user/interfaces/user.interface';

@Injectable()
export class AdminService {
	constructor(private readonly _userRepo: UserRepo) { }

	async convertUserToAdmin(createAdminDto: CreateAdminDto, currentUser: IUserModel) {

		if (!isValidId(createAdminDto.userId))
			throw ApiErrors.UnprocessableEntity({ message: 'invalid userId', param: 'userId' });

		if (createAdminDto.userId.toString() === currentUser._id.toString())
			throw ApiErrors.BadRequest({ message: 'لا يمكنك تغير الصلاحيات لنفسك', param: 'role' })

		await this._userRepo.findByIdAndUpdate(createAdminDto.userId, { roles: [createAdminDto.userRole] });
	}
}
