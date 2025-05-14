import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getServiceStatus(): string {
    return 'Reach Service Running';
  }
}
