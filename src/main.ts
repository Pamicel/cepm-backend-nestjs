import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('CEPM backend')
    .setDescription("L'API du CEPM")
    .setVersion('1.0-beta')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('explorer', app, document);
  await app.listen(8013);
}
bootstrap();
