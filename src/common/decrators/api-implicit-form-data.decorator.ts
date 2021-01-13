import { isNil } from '@nestjs/common/utils/shared.utils';
import { createParamDecorator } from '@nestjs/swagger/dist/decorators/helpers';

const initialMetadata = {
	name: '',
	required: true
};

export const ApiImplicitFormData = (metadata: {
	name: string;
	description?: string;
	required?: boolean;
	type: any;
	isArray?: boolean;
}): MethodDecorator => {
	const param = {
		name: isNil(metadata.name) ? initialMetadata.name : metadata.name,
		in: 'formData',
		description: metadata.description || '',
		required: metadata.required || false,
		type: metadata.type,
	};
	return createParamDecorator(param, initialMetadata);
};
