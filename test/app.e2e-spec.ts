import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController & GraphController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('GET / → should return Reach Service Running', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Reach Service Running');
  });

  it('GET /graph/shortest-path → should return expected path', async () => {
    const response = await request(app.getHttpServer())
      .get('/graph/shortest-path')
      .query({ startNode: 'T/2345', endNode: 'T/0031' })
      .expect(200);

    expect(response.body).toEqual({
      success: true,
      statusCode: 200,
      data: [
        { node: 'T/2345', classification: 'Transceiver' },
        { node: 'Bartrum-X5', classification: 'Link' },
        { node: 'M60', classification: 'Fibre' },
        { node: 'Matfold-A4', classification: 'Link' },
        { node: 'T/0031', classification: 'Transceiver' },
      ],
    });
  });
});
