const genderTypes = require("../app/utils/genderEnum");

module.exports = (sequelize, DataTypes) => {
  const actor = sequelize.define(
    "actor",
    {
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      gender: {
        allowNull: false,
        type: DataTypes.ENUM(genderTypes.inList),
      },
      DOB: {
        allowNull: false,
        type: DataTypes.DATEONLY,
      },
      Bio: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      actor_id: {
        allowNull: false,
        primaryKey: true,
        unique: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
    },
    {
      tableName: "actor",
    }
  );
  return actor;
};
