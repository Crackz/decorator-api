import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ApiErrors } from '../../../common/utils/api-errors';
import { IUserModel } from '../../user/interfaces/user.interface';
import { AuthService } from '../auth.service';
import { IJwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(private readonly authService: AuthService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: process.env.jwtSecret
		});
	}

	public async validate(payload: IJwtPayload, done: Function) {
		const user: IUserModel = await this.authService.findUserById(payload.sub);
		if (!user) return done(ApiErrors.Unauthenticated());

		done(null, user);
	}
}
