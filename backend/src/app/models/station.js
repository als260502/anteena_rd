
module.exports = (sequelize, DataTypes) => {
  const Station = sequelize.define('Station', {
    ap_address: DataTypes.STRING,
    ap_model: DataTypes.STRING,
  }, {
    underscored: true,
    tableName: 'stations',
  });

  Station.associate = (models) => {
    Station.belongsTo(models.AccessPoint, {
      foreingnKey: 'ap_id', as: 'ap',
    });
  };


  return Station;
};
