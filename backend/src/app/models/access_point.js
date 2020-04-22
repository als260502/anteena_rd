
module.exports = (sequelize, DataTypes) => {
  const AccessPoint = sequelize.define('AccessPoint', {
    ap_address: DataTypes.STRING,
    ap_model: DataTypes.STRING,
  }, {
    underscored: true,
    tableName: 'access_points',
  });
  AccessPoint.associate = (models) => {
    AccessPoint.hasMany(models.Station, { as: 'sta' });
  };


  return AccessPoint;
};
