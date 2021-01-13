import { plainToClass, Transform } from 'class-transformer';

function transformDataToDto(gotClass: { new (): any }, data: any) {
	const dto = new gotClass();
	const result = plainToClass(dto, data, { enableImplicitConversion: true });
	console.log(result);
	// Object.assign(dto, data)
	return result;

	// return dto;
}

export function TypeTransformer(classWrapperFun: () => { new (): any }, opts?: { isArray: boolean }) {
	return (target: any, key: string) => {
		return Transform((value) => {
			try {
				if (opts && opts.isArray && Array.isArray(value)) return value;
				const gotClass = classWrapperFun();
				switch (gotClass) {
					case Number:
						if (!opts || !opts.isArray) return +value;
						return value.split(',').map((stringvalue: string) => +stringvalue.replace(/"/g, '').trim());
					case String:
						if (!opts || !opts.isArray) return +value;
						return value.split(',').map((stringvalue: string) => stringvalue.replace(/"/g, '').trim());
					default:

						const parsedData = JSON.parse(value);
                        
                        if (opts && opts.isArray) {
							if (!Array.isArray(parsedData)) {
								return value;
							}
							return parsedData.map((elData) => transformDataToDto(gotClass, elData));
						} else {
							return transformDataToDto(gotClass, parsedData);
						}
				}
			} catch (err) {
				console.log('PARSE ERROR: \n', err);
				return value;
			}
		})(target, key);
	};
}
