import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { AppService } from './../src/app.service';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let result = [{ name: 'test' }];
  let appService = {
    getAll: () => result,
    getHello: () => 'Hello World!',
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(AppService)
      .useValue(appService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/ (POST)', () => {
    return request(app.getHttpServer())
      .post('/name')
      .send({ name: 'dennis' })
      .expect(201)
      .expect('hello dennis');
  });

  it(`/all (GET)`, () => {
    return request(app.getHttpServer()).get('/all').expect(200).expect(result);
  });

  it(`/user/:id (DELETE)`, () => {
    let id = 1;
    return request(app.getHttpServer())
      .delete(`/users/${1}`)
      .expect(200)
      .expect(`user ${id} deleted`);
  });

  it(`/user/:id (DELETE) not found error`, () => {
    let id = 356;
    return request(app.getHttpServer())
      .delete(`/users/${id}`)
      .expect(404)
      .expect({
        message: 'user does not exist',
        error: 'Not Found',
        statusCode: 404,
      });
  });

  it(`/user/:id (DELETE) not found error`, () => {
    let id = 'dfdf';
    return request(app.getHttpServer())
      .delete(`/users/${id}`)
      .expect(400)
      .expect({
        message: 'Validation failed (numeric string is expected)',
        error: 'Bad Request',
        statusCode: 400,
      });
  });

  afterEach(async () => {
    await app.close();
  });
});
