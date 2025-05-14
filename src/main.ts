import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { WinstonModule } from 'nest-winston';
import { winstonConfig } from './winston-logger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{
    logger: WinstonModule.createLogger(winstonConfig),
  });
  const configService = app.get(ConfigService);
  const PORT = configService.get<string>('PORT') || '3000';
  console.log(`Database host: ${PORT}`);
  await app.listen(PORT);
  console.log('🚀 Server running at http://localhost:3000');

}
bootstrap();
