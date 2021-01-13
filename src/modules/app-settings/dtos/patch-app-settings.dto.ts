import { IsIn, IsString } from 'class-validator';
import { Languages } from '../../../common/constants';

export class PatchAppSettingsDto {
	@IsString()
	@IsIn(Object.values(Languages))
	defaultLanguage: Languages;
}
