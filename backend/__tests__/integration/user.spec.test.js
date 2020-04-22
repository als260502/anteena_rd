const request = require('supertest');
const { User, sequelize } = require('../../src/app/models');
const app = require('../../src/app');
const factory = require('../factories');

describe('User', () => {
  beforeEach(async () => {
    await User.truncate();
    factory.cleanUp();
  });

  afterAll(async () => {
    await User.truncate();
    await sequelize.destroy();
  });

  it('Should create a user', async () => {
    const user = await factory.create('User', {
      password_hash: '123456',
    });

    const response = await request(app)
      .post('/user/create')
      .send({
        name: user.name,
        password: user.password_hash,
        email: user.email,
      });

    expect(response.status).toBe(200);
  });

  it('Should not access route /user/edit when not authenticated', async () => {
    const response = await request(app)
      .get('/user/edit/1');

    expect(response.status).toBe(401);
  });

  it('Should update a user', async () => {
    const user = await factory.create('User');

    const nameChanged = 'Andre Luiz';
    const passwordChanged = 'meunome';
    const emailChanged = 'neco@np.com';

    const response = await request(app)
      .patch(`/user/update/${user.id}`)
      .set({
        Authorization: await `Bearer ${user.generateToken()}`,
      })
      .send({
        name: nameChanged,
        password: passwordChanged,
        email: emailChanged,
      });


    expect(response.status).toBe(200);
  });
});
