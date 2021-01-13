import { ArrayMinSize, IsDefined, IsOptional, IsString } from 'class-validator';
import { DtoTransformer } from 'src/common/models/dto-transformer.model';

export class UpdateOrderAttachmentsDto extends DtoTransformer {
	@IsOptional()
	@IsDefined()
	@IsString({ each: true })
	attachments?: string[];

	static transformer(value: UpdateOrderAttachmentsDto): UpdateOrderAttachmentsDto {
		if (value.attachments) value.attachments = this.tryParseAsArray(value.attachments);

		return value;
	}
}
