import { IsNotEmpty, IsOptional, IsString, IsDefined, ArrayMinSize } from 'class-validator';
import { ClientGender } from '../interfaces/client.interface';

export class UpdateClientDto {
	@IsOptional()
	@IsString()
	@IsNotEmpty()
	name?: string;

	@IsOptional()
	@IsDefined()
	@IsString({ each: true })
	@ArrayMinSize(1)
	phones?: string[];

	@IsOptional()
	@IsString()
	@IsNotEmpty()
	gender?: ClientGender;

	@IsOptional()
	@IsString()
	@IsNotEmpty()
	address?: string;
}
