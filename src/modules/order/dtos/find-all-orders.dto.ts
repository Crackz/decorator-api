import { IsIn, IsOptional, IsString, IsArray, IsEnum } from 'class-validator';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { OrderStatus } from '../interfaces/order.interface';



export class FindAllOrdersDto extends PaginationDto {
	@IsOptional()
	@IsEnum(OrderStatus, { each: true })
	status?: OrderStatus | OrderStatus[]
}
