import { Test } from '@nestjs/testing';
import { AppModule } from '../../../../../src/app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

describe('GetHelloUsecase (e2e)', () => {
  let app: NestFastifyApplication;

  beforeEach(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter(),
    );

    await app.init();
    await app.getHttpAdapter().getInstance().ready();
  });

  it('should return "Hello World!"', () => {
    return app
      .inject({
        method: 'GET',
        url: '/demo',
      })
      .then((result) => {
        expect(result.statusCode).toEqual(200);
        expect(result.payload).toEqual('Hello World!');
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
