const request = require('supertest');
const { AccessPoint, sequelize } = require('../../src/app/models');
const app = require('../../src/app');
const factory = require('../factories');

describe('Access Point', () => {
  beforeEach(async () => {
    await AccessPoint.truncate();
    factory.cleanUp();
  });

  afterAll(async () => {
    await AccessPoint.truncate();
    await sequelize.destroy();
  });

  it('Should not access route /dashboard/ap/create when not authenticated', async () => {
    const response = await request(app)
      .post('/dashboard/ap/create');

    expect(response.status).toBe(401);
  });

  it('Should create a access point', async () => {
    const user = await factory.create('User');
    const ap = await factory.create('AccessPoint');

    const token = await user.generateToken();

    const response = await request(app)
      .post('/dashboard/ap/create')
      .send({
        address: ap.ap_address,
        model: ap.ap_model,
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.status).toBe(200);
  });
});
