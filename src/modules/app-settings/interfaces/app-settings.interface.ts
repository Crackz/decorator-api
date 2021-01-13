import { Document } from 'mongoose';
import { Languages } from '../../../common/constants';

export interface IAppSettingsModel extends Document {
	defaultLanguage: Languages;
}
