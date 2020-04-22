
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('stations', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    ap_id: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: { model: 'access_points', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    },
    st_address: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    st_model: {
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
  down: (queryInterface, Sequelize) => queryInterface.dropTable('stations'),
};
