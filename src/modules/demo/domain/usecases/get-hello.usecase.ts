import { Injectable } from '@nestjs/common';

@Injectable()
export class GetHelloUsecase {
  execute(): string {
    return 'Hello World!';
  }
}
