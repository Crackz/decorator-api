import { User } from '../../user/interfaces/user.interface';

export interface IRegisteredResponse {
	readonly user: User;
	readonly accessToken: String;
}
