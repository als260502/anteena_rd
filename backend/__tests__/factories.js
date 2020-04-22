const faker = require('faker');

const { factory } = require('factory-girl');
const { User, AccessPoint, Station } = require('../src/app/models');


factory.define('User', User, {
  name: faker.name.findName(),
  email: faker.internet.email(),
  password_hash: faker.internet.password(),
});

factory.define('AccessPoint', AccessPoint, {
  ap_address: faker.address.streetAddress(),
  ap_model: 'NanoBean',
});

factory.define('Station', Station, {
  st_address: faker.address.streetAddress(),
  st_model: 'PowerBean',
});

module.exports = factory;
