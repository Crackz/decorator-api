import { IsNotEmpty, IsString, Allow, IsOptional, IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Languages } from '../../../common/constants';

export class RegisterUserDto {

	@IsString()
	@IsNotEmpty()
	name: string;

	@IsNotEmpty()
	phone: string;

	@IsNotEmpty()
	password: string;

	@ApiProperty({ type: 'string', format: 'binary' })
	@Allow()
	profileImg: string;

	@IsOptional()
	@IsString()
	@IsIn(Object.values(Languages))
	language? = 'ar';

}