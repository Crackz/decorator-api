import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { ApiErrors } from '../utils/api-errors';
import { AccessControlError } from 'accesscontrol';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
	catch(exception: any, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse();
		const request = ctx.getRequest();

		let message = '',
			status = HttpStatus.INTERNAL_SERVER_ERROR;

		if (exception instanceof ApiErrors) {
			return exception.handle(request, response);
		} else if (exception instanceof HttpException) {
			message += exception.message.message || exception.message.error;
			status = exception.getStatus();
		} else if (exception.name === 'AccessControlError') {
			message += 'Forbidden Resource';
			status = HttpStatus.FORBIDDEN;
		} else {
			message += exception.message;
		}

		response.status(status).json({
			error: {
				errors: [
					{
						message
					}
				]
			}
		});

		if (status === HttpStatus.INTERNAL_SERVER_ERROR || process.env.NODE_ENV !== 'development') {
			console.log('Server Response:\n', exception);
		}
	}
}
