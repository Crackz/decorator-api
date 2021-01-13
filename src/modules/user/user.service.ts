import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AccessControl } from 'src/app.roles';
import { ApiErrors } from '../../common/utils/api-errors';
import { AppSettingsService } from '../app-settings/app-settings.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { IUserModel, User } from './interfaces/user.interface';
import { UserRepo } from './repos/user.repo';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { PaginatedResult } from 'src/common/models/paginated-result.model';
import { BaseService } from 'src/common/services/base.service';

@Injectable()
export class UserService extends BaseService {
	constructor(
		private readonly _userRepo: UserRepo,
		private readonly _appSettingsService: AppSettingsService
	) { super(_userRepo) }

	private async _hash(word) {
		const salt = bcrypt.genSaltSync();
		return await bcrypt.hash(word, salt);
	}


	async findAll(query: PaginationDto): Promise<PaginatedResult<IUserModel>> {
		const findQuery = {}
		return await this._userRepo.findPaginated(
			findQuery,
			{
				page: query.page,
				limit: query.limit,
				sort: { updatedAt: -1 },
			}
		);
	}
	async create(createUserDto: CreateUserDto): Promise<IUserModel> {
		if (!createUserDto.language)
			createUserDto.language = await this._appSettingsService.getValueOf('defaultLanguage');

		await this.checkPhoneDuplication(createUserDto.phone)

		const createdUser = await this._userRepo.create({
			...createUserDto,
			password: await this._hash(createUserDto.password),
			roles: [AccessControl.Roles.USER]
		});

		return createdUser;
	}

	async findById(id): Promise<IUserModel> {
		return await this._userRepo.findById(id);
	}

	async findOne(findQuery): Promise<IUserModel> {
		return await this._userRepo.findOne(findQuery);
	}

	async updatePassword(userId, newPassword): Promise<IUserModel> {
		return await this._userRepo.findByIdAndUpdate(userId, { password: await this._hash(newPassword) });
	}

	async checkPhoneDuplication(phone) {
		const foundUser = await this._userRepo.findOne({ phone });
		if (foundUser)
			throw ApiErrors.Conflict({ message: `هذا الرقم "${phone}" مسجل من قبل`, param: 'phone' });
	}

	getUserOnRegistrationOrLogin(user: IUserModel): User {
		return this._userRepo.getUserOnRegistrationOrLogin(user);
	}
}
