const { User } = require('../models');

module.exports = {
  async index(req, res) {
    const { id } = req.params;

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    user.password_hash = undefined;
    user.password = undefined;
    return res.json({ user });
  },
  async store(req, res) {
    const { email, password, name } = req.body;

    const user = await User.findOne({ where: { email } });

    if (user) return res.status(401).json({ error: 'email is alread in use' });

    const us = await User.create({
      name,
      email,
      password_hash: password,
    });

    if (!us) return res.status(401).json({ error: 'user not created' });

    us.password_hash = undefined;
    us.password = undefined;
    return res.json({ us });
  },

  async update(req, res) {
    const { email, name, password } = req.body;
    const { id } = req.params;


    const user = await User.findByPk(id);
    if (!user) return res.status(401).json({ message: 'User no found!' });

    user.email = email;
    user.name = name;
    user.password_hash = password;

    const updatedUser = await user.save();

    return res.json({ updatedUser });
  },

};
