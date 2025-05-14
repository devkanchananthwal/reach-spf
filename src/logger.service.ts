import { Injectable } from '@nestjs/common';
import { LoggerService } from '@nestjs/common';
import { Logger } from 'winston';
import { Inject } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston'; // Import WINSTON_MODULE_PROVIDER

@Injectable()
export class WinstonLoggerService implements LoggerService {
  constructor(@Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger) {}

  log(message: string) {
    this.logger.info(message); // Log info level messages
  }

  error(message: string, trace: string) {
    this.logger.error(message, { trace }); // Log error level messages with stack trace
  }

  warn(message: string) {
    this.logger.warn(message); // Log warning level messages
  }

}
