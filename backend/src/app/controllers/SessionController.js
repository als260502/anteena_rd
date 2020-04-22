const { User } = require('../models');

module.exports = {
  async store(req, res) {
    const { password, email } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: 'email not found' });
    }

    const pass = await user.checkPassword(password);

    if (!pass) {
      return res.status(401).json({ error: 'invalid password' });
    }

    const token = await user.generateToken();

    user.password = undefined;

    return res.json({ user, token });
  },


};
