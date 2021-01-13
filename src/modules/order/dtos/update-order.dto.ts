import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { Allow, ArrayMinSize, IsArray, IsDefined, IsIn, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { DtoTransformer } from 'src/common/models/dto-transformer.model';
import { OrderStatus } from '../interfaces/order.interface';

export class UpdateProductDto {
	@IsDefined()
	@IsString()
	name: string;

	@IsDefined()
	@IsNumber()
	price: number;

	@IsDefined()
	@IsNumber()
	amount: number;

	@IsDefined()
	@IsString()
	unit: string;
}

export class UpdateOrderDto extends DtoTransformer {
	@ApiProperty({ type: [UpdateProductDto], required: false })
	@IsOptional()
	@IsDefined()
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => UpdateProductDto)
	products?: UpdateProductDto[];

	@IsOptional()
	@IsString()
	notes?: string;

	@ApiProperty({ type: 'string', format: 'binary', isArray: true, required: false })
	@IsOptional()
	@Allow()
	progressImgs?: string[];


	@IsOptional()
	@IsDefined()
	@IsString()
	@IsIn([OrderStatus.PENDING, OrderStatus.WORK_IN_PROGRESS, OrderStatus.FINISHED])
	status?: OrderStatus;

	static transformer(value: UpdateOrderDto): UpdateOrderDto {
		if (value.products) value.products = this.tryParseAsArray(value.products);
		return value;
	}
}
