export abstract class DtoTransformer {
	private static _handleParsing(value: any, opts = { isArray: false }) {
		if (opts && opts.isArray && Array.isArray(value)) return value;

		const parsedData = JSON.parse(value);
		if (opts && opts.isArray) {
			return !Array.isArray(parsedData) ? [ parsedData ] : parsedData;
		}

		return parsedData;
	}

	static converStringToArrayOfNumber(value: string) {
		try {
			return value.split(',').map((stringvalue: string) => +stringvalue.replace(/"/g, '').trim());
		} catch (err) {
			return value;
		}
	}

	static convertStringToArrayOfStrings(value: string) {
		try {
			return value.split(',').map((stringvalue: string) => stringvalue.replace(/"/g, '').trim());
		} catch (err) {
			return value;
		}
	}

	static tryParse(value: any) {
		try {
			return this._handleParsing(value);
		} catch (err) {
			return value;
		}
	}

	static tryParseAsArray(value: any) {
		try {
			return this._handleParsing(value, { isArray: true });
		} catch (err) {
			return value;
		}
	}
}
