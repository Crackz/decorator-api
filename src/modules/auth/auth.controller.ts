import { Controller, Post, UseGuards, UseInterceptors, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { User } from '../../common/decrators/user.decorator';
import { IUserModel } from '../user/interfaces/user.interface';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dtos';
import { RegisterUserDto } from './dtos/register-user.dto';
import { ILoginResponse } from './interfaces/login-response.interface';
import { IRegisteredResponse } from './interfaces/signup-response.interface';
import { HandleImgsInterceptor, UploadImg } from 'src/common/interceptors/imgs-handler.interceptor';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) { }

	static getImgsFields = (options = { isUpdate: false }): UploadImg[] => [
		{ name: 'profileImg', maxCount: 1, optional: options.isUpdate }
	];

	@ApiBody({ type: LoginUserDto })
	@Post('login')
	@UseGuards(AuthGuard('local'))
	async login(@User() user: IUserModel): Promise<ILoginResponse> {
		return await this.authService.login(user);
	}

	@ApiConsumes('multipart/form-data')
	@ApiBody({ type: RegisterUserDto })
	@Post('register')
	@UseInterceptors(
		FileFieldsInterceptor(AuthController.getImgsFields()),
		HandleImgsInterceptor(AuthController.getImgsFields())
	)
	async register(@Body() registerUserDto: RegisterUserDto): Promise<IRegisteredResponse> {
		return await this.authService.register(registerUserDto);
	}
}
