module.exports = (sequelize, DataTypes) => {
  const movie = sequelize.define(
    "movie",
    {
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      year_of_release: {
        allowNull: false,
        type: DataTypes.DATEONLY,
      },
      plot: {
        allowNull: false,
        type: DataTypes.TEXT ,
      },
      poster: {
        allowNull: false,
        type: DataTypes.TEXT ,
      },
      producer_id: {
        allowNull: false,
        type: DataTypes.UUID ,
      },
      movie_id: {
        allowNull: false,
        primaryKey: true,
        unique: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
    },
    {
      tableName: "movie",
    }
  );
  return movie;
};
