import { IsNotEmpty, IsOptional, IsString, IsArray, IsDefined, ArrayMinSize } from 'class-validator';
import { ClientGender } from '../interfaces/client.interface';

export class CreateClientDto {
	@IsString()
	@IsNotEmpty()
	name: string;

	
	@IsDefined()
	@IsString({ each: true })
	@ArrayMinSize(1)
	phones: string[];

	@IsString()
	@IsNotEmpty()
	gender: ClientGender;

	@IsOptional()
	@IsString()
	@IsNotEmpty()
	address?: string;
}
