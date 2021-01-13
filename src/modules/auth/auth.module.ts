import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
	imports: [
		UserModule,
		PassportModule.register({ defaultStrategy: 'jwt' }),
		JwtModule.registerAsync({
			useFactory: () => {
				return {
					secret: process.env.jwtSecret,
					signOptions: {
						expiresIn: 3600 * 10000
					}
				};
			}
		})
	],
	controllers: [ AuthController ],
	providers: [ AuthService, JwtStrategy, LocalStrategy ],
	exports: [ AuthService ]
})
export class AuthModule {}
