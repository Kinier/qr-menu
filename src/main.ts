import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaModel } from './_gen/prisma-class'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Backend api')
    .setDescription('Restaurants api')
    .setVersion('0.0000000000000001')
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    extraModels: [...PrismaModel.extraModels],
  })
  SwaggerModule.setup('api', app, document);
  app.enableCors(); // todo change maybe later
  await app.listen(5000);
}
bootstrap();
