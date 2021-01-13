import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiErrors } from '../../../common/utils/api-errors';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
	constructor(private opts = { allowAnonymous: false }) {
		super();
	}
	canActivate(context: ExecutionContext) {
		// Add your custom authentication logic here
		return super.canActivate(context);
	}

	handleRequest(err, user, info, context) {
		if (this.opts.allowAnonymous) {
			return user ? user : undefined;
		}

		if (err || !user) {
			throw err || ApiErrors.Unauthenticated();
		}
		return user;
	}
}
