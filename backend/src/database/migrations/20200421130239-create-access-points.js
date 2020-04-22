
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('access_points', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    ap_address: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    ap_model: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    created_at: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updated_at: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('access_points'),
};
