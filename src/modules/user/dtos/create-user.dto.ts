import { Allow, IsIn, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Languages } from '../../../common/constants';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
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
