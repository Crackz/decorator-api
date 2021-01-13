import * as dotenv from 'dotenv';
import { ajv } from '../../common/validators';
import configSchema from './config.schema';

export class ConfigService {
	static init(filePath: string) {
		const configurations = dotenv.config({ path: filePath });

		if (configurations.error) throw configurations.error;

		this._validateInput(configurations.parsed);
	}

	/**
	 * Ensures all needed variables are set
	 * including the applied default values.
	 */
	private static _validateInput(envConfig: dotenv.DotenvParseOutput | undefined) {
		const validateConfig = ajv.compile(configSchema);
		const validConfig = validateConfig(envConfig);

		if (!validConfig) {
			throw new Error(`Config validation error: ${JSON.stringify(validateConfig.errors)}`);
		}
	}
}
