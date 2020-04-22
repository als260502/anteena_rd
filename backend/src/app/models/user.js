const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    role: { type: DataTypes.STRING, defaultValue: 'user' },
    password_hash: DataTypes.VIRTUAL,
  }, {
    hooks: {
      beforeSave: async (user) => {
        if (user.password_hash) {
          user.password = await bcrypt.hash(user.password_hash, 8);
        }
      },
    },
    underscored: true,
    tableName: 'users',
  });
  /* User.associate = (models) => {
    associations can be defined here
  }; */

  // eslint-disable-next-line func-names
  User.prototype.checkPassword = function (password) {
    return bcrypt.compare(password, this.password);
  };

  // eslint-disable-next-line func-names
  User.prototype.generateToken = function () {
    return jwt.sign({ id: this.id }, process.env.APP_SECRET);
  };
  return User;
};
