import { User } from '../../user/interfaces/user.interface';

export interface ILoginResponse {
	readonly user: User;
	readonly accessToken: String;
}
