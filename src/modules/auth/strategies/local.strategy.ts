import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
	constructor(private readonly authService: AuthService) {
		super({
			usernameField: 'username',
			passReqToCallback: false
		});
	}

	public async validate(username: string, password: string, done: Function) {
		try {
			const foundUser = await this.authService.verifyLocal(username, password);
			return done(null, foundUser);
		} catch (err) {
			return done(err, false);
		}
	}
}
