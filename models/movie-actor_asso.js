module.exports = (sequelize, DataTypes) => {
  const movie_actor_asso = sequelize.define(
    "movie_actor_asso",
    {
      actor_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      movie_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    },
    {
      tableName: "movie_actor_asso",
    }
  );
  movie_actor_asso.associate = (models) => {
    movie_actor_asso.belongsTo(models.actor, {
      foreignKey: "actor_id",
      as: "actor",
    });
    movie_actor_asso.belongsTo(models.movie, {
      foreignKey: "movie_id",
      as: "movie",
    });
  };
  return movie_actor_asso;
};
