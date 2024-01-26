import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { UsersModule } from '../src/users/users.module';
import { DatabaseModule } from '../src/database/database.module';
import { faker } from '@faker-js/faker';

describe('UsersController (e2e)', () => {
  let app: INestApplication;
  let userId: number;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UsersModule, DatabaseModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/api/v1/users (POST)', async () => {
    const user = {
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      email: faker.internet.email(),
      gender: 'MALE',
    };
    const response = await request(app.getHttpServer())
      .post('/users')
      .send(user);

    userId = response.body.id;

    expect(response.body).toMatchObject(user);
  });

  it('/api/v1/users (GET)', async () => {
    const response = await request(app.getHttpServer()).get('/users');

    expect(response.body.length).toBeGreaterThan(0);
  });

  it('/api/v1/users/:id (GET)', async () => {
    const response = await request(app.getHttpServer()).get('/users');

    expect(response.body.length).toBeGreaterThan(0);
  });

  it('/api/v1/users/:id (UPDATE)', async () => {
    const user = {
      first_name: 'Manuel',
      last_name: 'Test',
      email: 'test@test.com',
      gender: 'MALE',
    };
    const response = await request(app.getHttpServer())
      .put('/users/' + userId)
      .send(user);

    expect(response.body).toMatchObject(user);
  });

  it('/api/v1/users/:id (DELETE)', async () => {
    const response = await request(app.getHttpServer()).delete(
      '/users/' + userId,
    );

    const responseObjectMatch = { affected: 1 };

    expect(response.body).toMatchObject(responseObjectMatch);
  });
});
