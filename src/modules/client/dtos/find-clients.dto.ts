import { IsNotEmpty, IsOptional, IsString, IsIn } from 'class-validator';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

export enum SortTypes {
	ASC = 'asc',
	DESC = 'desc'
}

export class FindClientsDto extends PaginationDto {
	@IsOptional()
	@IsString()
	@IsNotEmpty()
	name?: string;

	@IsOptional()
	@IsString()
	@IsNotEmpty()
	phone?: string;

	@IsOptional()
	@IsString()
	@IsNotEmpty()
	address?: string;

	@IsOptional()
	@IsString()
	@IsIn([ SortTypes.ASC, SortTypes.DESC ])
	sortByName?: SortTypes;

	@IsOptional()
	@IsString()
	@IsIn([ SortTypes.ASC, SortTypes.DESC ])
	sortByPhone?: SortTypes;


	@IsOptional()
	@IsString()
	@IsIn([ SortTypes.ASC, SortTypes.DESC ])
	sortByAddress?: SortTypes;

}
