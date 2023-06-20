import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getAll(): { name: string }[] {
    return [{ name: 'lfx digital' }];
  }
}
