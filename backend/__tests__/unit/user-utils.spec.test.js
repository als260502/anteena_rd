const bcrypt = require('bcryptjs');
const { User } = require('../../src/app/models');

describe('User-Utils', () => {
  beforeEach(async () => {
    User.truncate();
  });

  it('Sould create a hash password for user', async () => {
    const user = await User.create({
      name: 'Andre Souza',
      password_hash: '123456',
      email: 'andre@np.com.br',
    });

    // eslint-disable-next-line camelcase
    const { password, password_hash } = user;
    const compareHash = await bcrypt.compare(password_hash, password);

    expect(compareHash).toBe(true);
  });
});
