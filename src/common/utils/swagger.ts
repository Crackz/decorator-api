import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export class Swagger {
	static setup(app) {
		const options = new DocumentBuilder()
			.setTitle('Khayal API')
			.setDescription("Let's make our dream come true")
			.setVersion('1.0')
			.addServer('/api/v1')
			.addBearerAuth()
			.build();

		const document = SwaggerModule.createDocument(app, options);
		SwaggerModule.setup('/docs', app, document);
	}
}
