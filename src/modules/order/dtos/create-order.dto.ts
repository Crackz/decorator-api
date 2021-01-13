import { ApiProperty } from '@nestjs/swagger';
import { Allow, ArrayMinSize, IsArray, IsDefined, IsNumber, IsString, ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { DtoTransformer } from 'src/common/models/dto-transformer.model';

export class CreateProductDto {
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


export class CreateOrderDto extends DtoTransformer {

	@ApiProperty({ type: [CreateProductDto], required: false })
	@IsOptional()
	@IsDefined()
	@IsArray()
	@ArrayMinSize(1)
	@ValidateNested({ each: true })
	@Type(() => CreateProductDto)
	products: CreateProductDto[]

	@IsOptional()
	@IsString()
	notes?: string;

	@ApiProperty({ type: 'string', format: 'binary', isArray: true })
	@Allow()
	progressImgs?: string[];

	static transformer(value: CreateOrderDto): CreateOrderDto {
		if (value.products)
			value.products = this.tryParseAsArray(value.products);
		return value;
	}
}
