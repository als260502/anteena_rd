const request = require('supertest');
const { User, sequelize } = require('../../src/app/models');
const app = require('../../src/app');
const factory = require('../factories');

describe('Session', () => {
  beforeEach(async () => {
    await User.truncate();
    factory.cleanUp();
  });

  afterAll(async () => {
    await User.truncate();
    await sequelize.destroy();
  });

  it('Should not authenticate with invalid email', async () => {
    const user = await factory.create('User', {
      email: 'andre@np.com.br',
    });

    const response = await request(app)
      .post('/session')
      .send({
        email: 'andre@np.com',
        password: user.password_hash,
      });
    expect(response.status).toBe(401);
  });

  it('Sould not authenticate with invalid password', async () => {
    const user = await factory.create('User', {
      password_hash: '123456',
    });

    const response = await request(app)
      .post('/session')
      .send({
        email: user.email,
        password: '12345',
      });
    expect(response.status).toBe(401);
  });

  it('Sould authenticate with valid credentials', async () => {
    const user = await factory.create('User');

    const response = await request(app)
      .post('/session')
      .send({
        email: user.email,
        password: user.password_hash,
      });
    expect(response.status).toBe(200);
  });

  it('should return jwt token when authenticated', async () => {
    const user = await factory.create('User');

    // console.log(user)
    const response = await request(app)
      .post('/session')
      .send({
        email: user.email,
        password: user.password_hash,
      });

    expect(response.body).toHaveProperty('token');
  });

  it('it should be able to access private routes when authenticated', async () => {
    const user = await factory.create('User');

    const response = await request(app)
      .get('/dashboard')
      .set('Authorization', `Bearer ${user.generateToken()}`);

    expect(response.status).toBe(200);
  });

  it('it should not be able to access private routes without jwt token ', async () => {
    const response = await request(app).get('/dashboard');
    expect(response.status).toBe(401);
  });

  it('it should not be able to access private routes with invalid jwt token', async () => {
    const user = await factory.create('User', {
      password: '123456',
    });

    const response = await request(app)
      .get('/dashboard')
      .set('Authorization', 'Bearer 123123');

    expect(response.status).toBe(401);
  });
});
