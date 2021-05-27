import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
// import { JwtAuthGuard } from '../src/auth/jwt-auth.guard';
// import { PermissionsGuard } from '../src/auth/permission-level.guard';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  // const mockGuard: CanActivate = { canActivate: jest.fn(() => true) };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  async function loginAdmin() {
    const loginResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'paulamicel@gmail.com', password: '00000000' })
      .expect(201);
    // store the jwt token for the next request
    const { token } = loginResponse.body;
    return token;
  }

  it('/auth/login (POST) admin exists and login works', async () => {
    const jwt = await loginAdmin();
    expect(jwt).toBeDefined();
  });

  it('/ (GET)', async () => {
    const jwt = await loginAdmin();

    return request(app.getHttpServer())
      .get('/')
      .set('Authorization', 'Bearer ' + jwt)
      .expect(200)
      .expect('Hello World!');
  });

  it('/users (POST)', async () => {
    const jwt = await loginAdmin();
    const user = {
      email: 'jean-legun@hotmail.fr',
      password: '00000000',
    };

    const response = await request(app.getHttpServer())
      .post('/users')
      .set('Authorization', 'Bearer ' + jwt)
      .send(user)
      .expect(201);

    console.log(response.body);
    expect(response.body).toMatchObject({ email: user.email });
  });

  it('/users (GET)', async () => {
    const jwt = await loginAdmin();
    return request(app.getHttpServer())
      .post('/users')
      .set('Authorization', 'Bearer ' + jwt)
      .send({
        email: 'jean-legun@hotmail.fr',
        password: '00000000',
      })
      .expect(201);
  });
});
