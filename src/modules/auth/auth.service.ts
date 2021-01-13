import { Injectable, Body } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Errors } from '../../common/constants';
import { ApiErrors } from '../../common/utils/api-errors';
import { IUserModel } from '../user/interfaces/user.interface';
import { UserService } from '../user/user.service';
import { IJwtPayload } from './interfaces/jwt-payload.interface';
import { ILoginResponse } from './interfaces/login-response.interface';
import { RegisterUserDto } from './dtos/register-user.dto';
import { IRegisteredResponse } from './interfaces/signup-response.interface';

@Injectable()
export class AuthService {
	constructor(private readonly _jwtService: JwtService, private readonly _userService: UserService) { }

	createToken(userId): string {
		const jwtPayload: IJwtPayload = { sub: userId };
		const accessToken = this._jwtService.sign(jwtPayload);

		return accessToken;
	}

	login(user: IUserModel): ILoginResponse {
		return {
			user: this._userService.getUserOnRegistrationOrLogin(user),
			accessToken: this.createToken(user._id)
		};
	}

	async verifyLocal(username, candidatePassword): Promise<IUserModel> {
		let findQuery = {} as any;
		if (username.includes('@')) {
			findQuery.email = username;
		} else {
			findQuery.phone = username;
		}

		let foundUser = await this._userService.findOne(findQuery);
		if (!foundUser) throw new ApiErrors({ errorType: Errors.Unauthenticated, message: 'رقم الهاتف او كلمه السر غير صحيحه' });

		let isMatched = await bcrypt.compare(candidatePassword, foundUser.password);
		if (!isMatched) throw new ApiErrors({ errorType: Errors.Unauthenticated, message: 'رقم الهاتف او كلمه السر غير صحيحه'  });

		return foundUser;
	}

	async findUserById(id: string): Promise<IUserModel> {
		return await this._userService.findById(id);
	}


	async register(registerUserDto: RegisterUserDto): Promise<IRegisteredResponse> {
		const createdUser = await this._userService.create(registerUserDto);

		return {
			accessToken: this.createToken(createdUser._id),
			user: createdUser
		}
	}

}
