// src/logger/logger.module.ts
import { Module } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { winstonConfig } from './winston-logger.config';
import { WinstonLoggerService } from './logger.service';

@Module({
  imports: [WinstonModule.forRoot(winstonConfig)], // Initialize Winston
  providers: [WinstonLoggerService],
  exports: [WinstonLoggerService], // Export the custom logger
})
export class LoggerModule {}
